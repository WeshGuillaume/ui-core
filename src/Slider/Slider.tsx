import * as React from 'react'

import { isFunction, isNil } from '../_internal/data'
import palette from '../palette'

import SliderProps, {
  Tooltip,
  Value,
  Element,
  Indicator,
} from './Slider.interface'
import {
  SliderContainer,
  SliderContent,
  SliderMainBar,
  SliderTooltip,
  SliderBackgroundDot,
  SliderIndicator,
} from './Slider.style'
import SliderBar from './SliderBar'
import SliderDot from './SliderDot'

const EMPTY_RANGE: [Element, Element] = [null, null]

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    disabled = false,
    range = false,
    onChange = () => {},
    tooltipFormatter,
    tooltipSuffix = '',
    customValues,
    indicators: rawIndicators = [],
    min = 0,
    max: rawMax = 100,
    step: rawStep = 5,
    dots: rawDots,
    value: rawValue,
    ...rest
  } = props

  const max = customValues ? customValues.length - 1 : rawMax
  const step = customValues ? 1 : rawStep
  const dots = customValues ? true : rawDots
  const value = !Array.isArray(rawValue) && range ? EMPTY_RANGE : rawValue

  const barRef = React.useRef<HTMLDivElement>(null)
  const [localValue, setLocalValue] = React.useState<Value>(value)
  const localValueRef = React.useRef<Value>(value)
  const hasValue = range
    ? !isNil((localValue as [Element, Element])[0]) &&
      !isNil((localValue as [Element, Element])[1])
    : !isNil(localValue)

  const getPositionFromValue = React.useCallback(
    (currentValue?: number) => {
      if (isNil(currentValue)) {
        return 0
      }

      return (100 * (currentValue - min)) / (max - min)
    },
    [max, min]
  )

  const indicators = React.useMemo<Indicator[]>(
    () =>
      rawIndicators.map(indicator => {
        const indicatorMinInRange = Math.min(...indicator.range)
        const indicatorMaxInRange = Math.max(...indicator.range)
        const indicatorMin =
          indicatorMinInRange > min ? indicatorMinInRange : min
        const indicatorMax =
          indicatorMaxInRange < max ? indicatorMaxInRange : max

        return {
          color: palette.orange[400],
          ...indicator,
          range: [
            getPositionFromValue(indicatorMin),
            getPositionFromValue(indicatorMax),
          ],
        }
      }),
    [getPositionFromValue, max, min, rawIndicators]
  )

  React.useEffect(() => {
    localValueRef.current = localValue
  }, [localValue])

  React.useEffect(() => {
    setLocalValue(value)
  }, [value])

  const getValueFromPosition = (currentPosition: number) => {
    const boundedPosition = Math.min(Math.max(currentPosition, 0), 100)

    const exactValue = (boundedPosition * (max - min)) / 100 + min

    return Math.round(exactValue / step) * step
  }

  const buildDot = (rangeIndex: 0 | 1 = 0) => {
    const getDotValue = (): number => {
      if (range) {
        if (rangeIndex === 1) {
          return isNil((localValue as [number, number])[1])
            ? max
            : (localValue as [number, number])[1]
        }

        return isNil((localValue as [number, number])[0])
          ? min
          : (localValue as [number, number])[0]
      }

      return isNil(localValue) ? min : (localValue as number)
    }

    const dotValue = getDotValue()

    const matchingIndicator = indicators.find(
      ({ range }) =>
        Math.min(...range) <= dotValue && Math.max(...range) >= dotValue
    )

    const position = getPositionFromValue(dotValue)

    const handlePositionChange = (delta: number) => {
      const newPosition =
        position +
        (delta /
          (barRef.current
            ? (barRef.current as HTMLDivElement).offsetWidth
            : 0)) *
          100

      const newValue = getValueFromPosition(newPosition)

      setLocalValue(prev =>
        range
          ? ([
              ...(prev as [Element, Element]).slice(0, rangeIndex),
              newValue,
              ...(prev as [Element, Element]).slice(rangeIndex + 1),
            ] as [Element, Element])
          : newValue
      )
    }

    return (
      <SliderDot
        key={rangeIndex}
        position={position}
        onMove={handlePositionChange}
        onRest={() => handleChange(localValueRef.current)}
        innerColor={matchingIndicator ? matchingIndicator.color : undefined}
        large={rangeIndex > 0}
      />
    )
  }

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const setValue = (val: [number, number] | number) => {
      setLocalValue(val)
      handleChange(val)
    }

    if (barRef.current) {
      const eventPosition =
        e.pageX - barRef.current.getBoundingClientRect().left
      const newPosition = (eventPosition / barRef.current.offsetWidth) * 100

      const value = getValueFromPosition(newPosition)

      if (range) {
        if (!hasValue) {
          setValue([min, value])
        } else {
          const typedValue = localValue as [number, number]
          const isUpdatingFirstElement =
            Math.abs(value - (typedValue[0] || 0)) <
            Math.abs(value - (typedValue[1] || 0))

          setValue(
            isUpdatingFirstElement
              ? [value, typedValue[1]]
              : [typedValue[0], value]
          )
        }
      } else {
        setValue(value)
      }
    }
  }

  const handleChange = (val: Value) => {
    const sanitizedValue: Value =
      Array.isArray(val) &&
      val[0] !== null &&
      val[1] !== null &&
      val[0] > val[1]
        ? [val[1], val[0]]
        : val

    onChange(sanitizedValue)
  }

  const valueDots = range ? [buildDot(0), buildDot(1)] : buildDot()

  const valueBar = React.useMemo(() => {
    const getComponent = ({ from, to }: { from: number; to: number }) => (
      <SliderBar
        from={getPositionFromValue(from)}
        to={getPositionFromValue(to)}
        indicators={indicators}
      />
    )

    if (range) {
      if (
        !hasValue ||
        (Array.isArray(customValues) && customValues.length === 0)
      ) {
        return getComponent({ from: min, to: max })
      }

      const value = (hasValue ? localValue : [min, min]) as [number, number]

      return getComponent({
        from: Math.min(...value),
        to: Math.max(...value),
      })
    }

    return getComponent({
      from: min,
      to: (hasValue ? localValue : max) as number,
    })
  }, [
    customValues,
    getPositionFromValue,
    hasValue,
    indicators,
    localValue,
    max,
    min,
    range,
  ])

  const valueIndicator = React.useMemo(
    () =>
      indicators.map(indicator => {
        const getPosition = ([from, to]: [number, number], opacity = 1) => ({
          left: `${from}%`,
          right: `${100 - to}%`,
          opacity,
        })

        return (
          <React.Fragment key={indicator.range.join('.')}>
            <SliderIndicator
              color="#fff"
              style={getPosition(indicator.range)}
            />
            <SliderIndicator
              color={indicator.color}
              style={getPosition(indicator.range, 0.5)}
            />
          </React.Fragment>
        )
      }),
    [indicators]
  )

  const tooltips = React.useMemo<Tooltip[]>(() => {
    const getValue = (value: number, rangeIndex?: 0 | 1): number => {
      if (isNil(value)) {
        return rangeIndex === 1 ? max : min
      }

      return value
    }

    const buildTooltip = (value: number, rangeIndex?: 0 | 1): Tooltip => {
      const sanitizedValue = getValue(value, rangeIndex)
      const label = customValues
        ? customValues[sanitizedValue] || ''
        : sanitizedValue
      const raw = `${label}${tooltipSuffix}`

      const content = isFunction(tooltipFormatter)
        ? tooltipFormatter(value, raw)
        : raw

      return {
        content,
        position: getPositionFromValue(value),
      }
    }

    if (range) {
      const rangeLocalValue = localValue as [number, number]

      return [
        buildTooltip(rangeLocalValue[0], 0),
        buildTooltip(rangeLocalValue[1], 1),
      ]
    }

    return [buildTooltip(localValue as number)]
  }, [
    customValues,
    getPositionFromValue,
    localValue,
    max,
    min,
    range,
    tooltipFormatter,
    tooltipSuffix,
  ])

  const possibleValues = Array.from(
    { length: (max - min) / step + 1 },
    (_, i) => (min + i) * step
  )

  return (
    <SliderContainer>
      <SliderContent
        {...rest}
        data-disabled={disabled}
        onClick={handleBarClick}
        ref={ref}
      >
        <SliderMainBar ref={barRef} />
        {valueDots}
        {valueBar}
        {valueIndicator}
        {dots &&
          possibleValues.map((value, index) => (
            <SliderBackgroundDot
              key={index}
              style={{ left: `${getPositionFromValue(value)}%` }}
            />
          ))}
      </SliderContent>
      {tooltips.map((tooltip, index) => (
        <SliderTooltip
          key={index}
          data-testid="slider-tooltip"
          style={{ paddingLeft: `${tooltip.position}%` }}
          opacity={1}
        >
          {tooltip.content}
        </SliderTooltip>
      ))}
    </SliderContainer>
  )
})

export default Slider