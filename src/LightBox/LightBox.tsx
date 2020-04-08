import useModal, { Modal } from '@delangle/use-modal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { isFunction } from '../_internal/data'
import { isClientSide } from '../_internal/ssr'
import { ANIMATION_DURATION } from '../Menu/Menu.style'
import withTriggerElement from '../withTriggerElement'

import { LightBoxInnerProps } from './LightBox.interface'
import { LightBoxOverlay, CloseIcon } from './LightBox.style'

const LightBox = React.forwardRef<HTMLDivElement, LightBoxInnerProps>(
  (props, ref) => {
    const {
      open,
      onClose,
      children,
      persistent,
      animated = true,
      ...rest
    } = props

    const modal = useModal<HTMLDivElement>({
      open,
      onClose,
      persistent,
      animated,
      animationDuration: ANIMATION_DURATION,
    })

    const content = (
      <LightBoxOverlay
        ref={ref}
        backgroundColor="#FFFFFF"
        data-state={modal.state}
        {...rest}
      >
        <CloseIcon icon="close" onClick={modal.close} small />
        {isFunction(children)
          ? children(modal as Modal<HTMLDivElement>)
          : children}
      </LightBoxOverlay>
    )

    return isClientSide
      ? ReactDOM.createPortal(content, document.body)
      : content
  }
)

export default withTriggerElement<HTMLDivElement>()<LightBoxInnerProps>(
  LightBox
)
