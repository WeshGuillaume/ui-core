import * as React from 'react'
import Swipe from 'react-easy-swipe'

import { Icon } from '../Icon'
import { useTheme } from '../useTheme'

import { NotificationProps } from './Toaster.interface'
import {
  ToasterContent,
  ToasterText,
  IllustrationContainer,
  CloseContainer,
} from './Toaster.style'

export const Toaster = React.forwardRef<HTMLDivElement, NotificationProps>(
  (props, ref) => {
    const {
      onClose,
      onSeeMore,
      message,
      illustration,
      warning,
      ...rest
    } = props
    const theme = useTheme()

    return (
      <Swipe
        onSwipeDown={onClose}
        onSwipeUp={onSeeMore}
        onSwipeLeft={onSeeMore}
        onSwipeRight={onSeeMore}
        allowMouseEvents
        innerRef={() => {}}
      >
        <ToasterContent
          backgroundColor={
            warning ? theme.colors.warning.base : theme.colors.secondary.base
          }
          ref={ref}
          data-testid="notification-container"
          {...rest}
        >
          {illustration && (
            <IllustrationContainer>{illustration}</IllustrationContainer>
          )}
          <ToasterText data-testid="notification-text" opacity={1}>
            {message}
          </ToasterText>
          <CloseContainer onClick={onClose}>
            <Icon icon="close" />
          </CloseContainer>
        </ToasterContent>
      </Swipe>
    )
  }
)
