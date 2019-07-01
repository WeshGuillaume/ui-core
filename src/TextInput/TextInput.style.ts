import styled from 'styled-components'

import breakpoints from '../breakpoints'
import palette from '../palette'
import theme from '../theme'

export const Input = styled.input`
  font-family: ${theme.font()};
  flex: 1;
  margin: 0;
  padding: 0 16px;
  max-height: 3rem;
  min-height: 3rem;
  max-width: 100%;
  min-width: 0;
  font-size: 16px;

  background-color: ${palette.darkBlue[200]};
  color: ${theme.color('secondary')};

  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: solid 1.5px ${palette.darkBlue[200]};
  border-radius: 4px;

  transition: all 150ms ease-in-out;

  &::placeholder {
    color: ${theme.textColor('placeholder')};
  }

  &[data-small='true'] {
    padding: 0 12px;
    min-height: 2.3rem;
    max-height: 2.3rem;
  }

  &:disabled {
    border-color: ${palette.darkBlue[200]};
    background-color: ${palette.darkBlue[200]};
    color: ${palette.darkBlue[700]};

    &::placeholder {
      color: ${theme.textColor('disabledPlaceholder')};
    }
  }

  &:not(:disabled) {
    &:hover,
    &:focus {
      border-color: ${palette.darkBlue[300]};
    }

    &:focus {
      background-color: #fff;
    }

    &[data-error='true'] {
      border-color: ${palette.orange[400]};
      color: ${palette.orange[400]};
      box-shadow: 0 1px 0 ${palette.orange[400]};
    }
  }

  @media (${breakpoints.below.phone}) {
    font-size: 14px;
  }
`
