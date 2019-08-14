import * as React from 'react'

import { isFunction } from './data'
import { useTimeout } from './hooks'

export type ModalParams<RefElement> = {
  open?: boolean
  persistent?: boolean
  animated?: boolean
  animationDuration?: number
  onClose?: (e: Event) => void
  ref?: React.Ref<RefElement>
}

export type ModalState<RefElement> = {
  state: 'opened' | 'closed' | 'opening' | 'closing'
  close: (e?: React.SyntheticEvent<HTMLElement>) => void
  overlayClick: (e: React.MouseEvent<HTMLElement> | MouseEvent) => void
  ref: React.Ref<RefElement>
  hasAlreadyBeenOpened: boolean
}

const ESCAPE_KEY = 27

const useForceRender = () => {
  const [, setState] = React.useState()

  return React.useCallback(() => setState(null), [])
}

const useMergedRef = <RefElement>(
  ref: React.Ref<RefElement> | null | undefined
): React.RefObject<RefElement> => {
  const innerRef = React.useRef<RefElement>(null)

  return (ref ? ref : innerRef) as React.RefObject<RefElement>
}

const useModal = <RefElement extends HTMLElement>({
  animated,
  animationDuration,
  ref,
  ...restParams
}: ModalParams<RefElement>): ModalState<RefElement> => {
  const hasAlreadyRendered = React.useRef(false)
  const domRef = useMergedRef<RefElement>(ref)
  const forceRender = useForceRender()
  const registerTimeout = useTimeout()

  const params = { animated, animationDuration, ...restParams } as ModalParams<
    RefElement
  >
  const paramsRef = React.useRef(params)

  const hasAlreadyBeenOpened = React.useRef<boolean>(false)
  const [isLocalOpened, setLocalOpened] = React.useState<boolean>(false)

  if (!hasAlreadyBeenOpened.current && restParams.open) {
    hasAlreadyBeenOpened.current = true
  }
  if (!hasAlreadyRendered.current && animated) {
    params.open = false
  }

  React.useEffect(() => {
    paramsRef.current = params
  })

  React.useEffect(() => {
    hasAlreadyRendered.current = true
    if (restParams.open) {
      forceRender()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = React.useCallback((e = null) => {
    if (isFunction(paramsRef.current.onClose)) {
      paramsRef.current.onClose(e)
    }
  }, [])

  const handleOverlayClick = React.useCallback(
    e => {
      if (
        !paramsRef.current.persistent &&
        paramsRef.current.open &&
        domRef.current &&
        !domRef.current.contains(e.target)
      ) {
        handleClose(e)
      }
    },
    [domRef, handleClose]
  )

  React.useEffect(() => {
    if (paramsRef.current.animated) {
      registerTimeout(
        setTimeout(
          () => setLocalOpened(!!params.open),
          paramsRef.current.animationDuration
        )
      )
    }
  }, [params.open, registerTimeout])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !paramsRef.current.persistent &&
        paramsRef.current.open &&
        e.keyCode === ESCAPE_KEY
      ) {
        handleClose(e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClose])

  const state = React.useMemo(() => {
    if (!params.open && !isLocalOpened) {
      return 'closed'
    }

    if (!params.open && isLocalOpened) {
      return 'closing'
    }

    if (params.open && !isLocalOpened) {
      return 'opening'
    }

    return 'opened'
  }, [isLocalOpened, params.open])

  return {
    state,
    close: handleClose,
    overlayClick: handleOverlayClick,
    ref: domRef,
    hasAlreadyBeenOpened: hasAlreadyBeenOpened.current,
  }
}

export default useModal
