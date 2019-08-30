import * as React from 'react'

import useTheme from '../useTheme'

import TextInputProps from './TextInput.interface'
import { Input, InputContainer, RightElementContainer } from './TextInput.style'

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      small = false,
      error = false,
      className,
      style,
      rightElement,
      ...rest
    } = props
    const theme = useTheme()

    return (
      <InputContainer className={className} style={style} data-error={error}>
        <Input
          data-small={small}
          data-error={error}
          data-background={theme.backgroundColor !== '#FFFFFF'}
          {...rest}
          ref={ref}
        />
        {rightElement && (
          <RightElementContainer>{rightElement}</RightElementContainer>
        )}
      </InputContainer>
    )
  }
)

export default TextInput
