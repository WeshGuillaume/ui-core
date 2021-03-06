import useModal, { Modal as ModalType } from '@delangle/use-modal'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { isFunction } from '../_internal/data'
import { isClientSide } from '../_internal/ssr'
import { withTriggerElement } from '../withTriggerElement'

import { ModalInnerProps } from './Modal.interface'
import {
  ModalOverlay,
  ModalContainer,
  DesktopTitle,
  MobileTitle,
  ModalContent,
  ModalScrollableContent,
  CloseIcon,
  HeaderBarContainer,
  ANIMATION_DURATION,
} from './Modal.style'

const InnerModal = React.forwardRef<HTMLDivElement, ModalInnerProps>(
  (props, ref) => {
    const {
      open,
      onClose,
      children,
      title,
      animated = true,
      persistent = false,
      alwaysRenderChildren = false,
      width = 'regular',
      ...rest
    } = props

    const modal = useModal({
      ref,
      open,
      onClose,
      persistent,
      animated,
      animationDuration: ANIMATION_DURATION,
    })

    const content = (
      <ModalOverlay data-state={modal.state} data-testid="modal-overlay">
        <ModalContainer
          backgroundColor="#FFFFFF"
          ref={modal.ref}
          data-testid="modal-container"
          data-width={width}
          {...rest}
        >
          <HeaderBarContainer data-has-title={!!title}>
            {title && (
              <React.Fragment>
                <DesktopTitle type="section">{title}</DesktopTitle>
                <MobileTitle type="regular">{title}</MobileTitle>
              </React.Fragment>
            )}
            <CloseIcon
              data-has-title={!!title}
              onClick={modal.close}
              icon="close"
              small
            />
          </HeaderBarContainer>
          <ModalContent>
            <ModalScrollableContent data-has-title={!!title}>
              {isFunction(children) ? children(modal as ModalType) : children}
            </ModalScrollableContent>
          </ModalContent>
        </ModalContainer>
      </ModalOverlay>
    )

    if (!alwaysRenderChildren && !modal.hasAlreadyBeenOpened) {
      return null
    }

    return isClientSide
      ? ReactDOM.createPortal(content, document.body)
      : content
  }
)

export const Modal = withTriggerElement<HTMLDivElement>()<ModalInnerProps>(
  InnerModal
)
