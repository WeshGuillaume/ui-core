import * as React from 'react'

import { isFunction } from '../_internal/data'
import { ExpansionPanelContext } from '../ExpansionPanel/ExpansionPanel.context'

import { ControlledExpansionPanelItem } from './ControlledExpansionPanelItem'
import { ExpansionPanelItemProps } from './ExpansionPanelItem.interface'

export const ExpansionPanelItem = React.forwardRef<
  HTMLDivElement,
  ExpansionPanelItemProps
>((props, ref) => {
  const { children, onToggle, defaultOpen, ...rest } = props

  const { openedItems, setOpenedItems, multiOpen } = React.useContext(
    ExpansionPanelContext
  )

  const itemRef = React.useRef(Math.random())
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [contentHeight, setItemHeight] = React.useState(0)
  const open = openedItems.includes(itemRef.current)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight

      if (height !== contentHeight) {
        setItemHeight(height)
      }
    }
  })

  const handleToggle = React.useCallback(
    (e?: React.MouseEvent) => {
      if (multiOpen) {
        setOpenedItems((prev) =>
          prev.includes(itemRef.current)
            ? prev.filter((i) => i !== itemRef.current)
            : [...prev, itemRef.current]
        )
      } else {
        setOpenedItems((prev) =>
          prev.includes(itemRef.current) ? [] : [itemRef.current]
        )
      }

      if (isFunction(onToggle)) {
        onToggle(e)
      }
    },
    [onToggle, multiOpen, setOpenedItems]
  )

  React.useEffect(() => {
    if (defaultOpen) {
      handleToggle()
    }
  }, [defaultOpen, handleToggle])

  return (
    <ControlledExpansionPanelItem
      ref={ref}
      open={open}
      onToggle={handleToggle}
      {...rest}
    >
      {children}
    </ControlledExpansionPanelItem>
  )
})
