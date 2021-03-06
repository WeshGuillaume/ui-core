import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { useIsMounted, useTimeout } from '../_internal/hooks'
import { isClientSide } from '../_internal/ssr'
import { ANIMATION_DURATIONS } from '../animations'
import { Toaster, ToasterEventProps } from '../Toaster'

import { subscribe } from './notify'
import { StateToast, ToastOptions } from './ToasterList.interface'
import { ToasterListContainer, ToasterContainer } from './ToasterList.style'

const DEFAULT_DURATION = 5_000

export const ToasterList: React.FunctionComponent<{}> = () => {
  const isMounted = useIsMounted()
  const registerTimeout = useTimeout()

  const [toasts, setToasts] = React.useState<StateToast[]>([])

  const planDestroy = React.useCallback(
    (toastId: number) => {
      const timeout = setTimeout(() => {
        if (isMounted.current) {
          setToasts((prev) => prev.filter((el) => el.id !== toastId))
        }
      }, ANIMATION_DURATIONS.l)

      registerTimeout(timeout)

      return timeout
    },
    [isMounted, registerTimeout]
  )

  const handleClose = React.useCallback(
    (toastId: number) => {
      if (isMounted.current) {
        const timeout = planDestroy(toastId)

        setToasts((prev) =>
          prev.map((el) =>
            el.id === toastId ? { ...el, open: false, timeout } : el
          )
        )
      }
    },
    [isMounted, planDestroy]
  )

  const planClose = React.useCallback(
    (toastId: number, options: ToastOptions) => {
      const timeout = setTimeout(
        () => handleClose(toastId),
        options.duration || DEFAULT_DURATION
      )

      registerTimeout(timeout)

      return timeout
    },
    [handleClose, registerTimeout]
  )

  const handleFreeze = () => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => {
        if (toast.timeout) {
          clearTimeout(toast.timeout)
        }

        return {
          ...toast,
          open: true,
          hasBeenFrozen: true,
          timeout: null,
        }
      })
    )
  }

  const handleResetTimers = () => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => ({
        ...toast,
        timeout: toast.open
          ? planClose(toast.id, toast.options)
          : planDestroy(toast.id),
      }))
    )
  }

  React.useEffect(
    () =>
      subscribe((message, options) => {
        const toastId = Math.random()

        let closeToastTimeout: number | null = null
        if (options.duration !== 0) {
          closeToastTimeout = planClose(toastId, options)
        }

        const toast: StateToast = {
          message,
          options,
          open: true,
          hasBeenFrozen: false,
          id: toastId,
          timeout: closeToastTimeout,
        }

        setToasts((prev) => [...prev, toast])
      }),
    [planClose]
  )

  const content = (
    <ToasterListContainer onClick={(e) => e.stopPropagation()}>
      {toasts.map((toast) => {
        const props: ToasterEventProps = (toast.message as ToasterEventProps)
          ?.message
          ? (toast.message as ToasterEventProps)
          : { message: toast.message as React.ReactNode }

        return (
          <ToasterContainer
            key={toast.id}
            onMouseEnter={handleFreeze}
            onMouseLeave={handleResetTimers}
            data-has-been-frozen={toast.hasBeenFrozen}
            data-closing={!toast.open}
          >
            <Toaster onClose={() => handleClose(toast.id)} {...props} />
          </ToasterContainer>
        )
      })}
    </ToasterListContainer>
  )

  return isClientSide ? ReactDOM.createPortal(content, document.body) : content
}
