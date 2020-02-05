import styled from 'styled-components'

import palette from '../palette'
import theme from '../theme'

export const FakeInputContainer = styled.span`
  display: inline-block;
  position: relative;
`

export const FakeInput = styled.label`
  --radio-input-diameter: 24px;
  user-select: none;
  cursor: pointer;
  outline: none;
  width: var(--radio-input-diameter);
  min-width: var(--radio-input-diameter);
  height: var(--radio-input-diameter);
  border-radius: 50%;
  background: #fff;
  border: solid 1.5px transparent;
  transition: all 150ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-width: 3px;
  }
`

export const InnerCircle = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  transition: all 150ms ease-in-out;
`

export const Input = styled.input`
  align-items: center;
  display: none;

  &:not(:checked) + ${FakeInput}:focus {
    border-width: 4px;
    border-color: ${theme.color('primary')};
  }

  & + ${FakeInput}:active, &:checked + ${FakeInput}:focus {
    border-width: 3px;
    border-color: ${theme.color('primary')};
  }

  &:not(:checked) + ${FakeInput} ${InnerCircle} {
    opacity: 0;
    transform: scale(0);
  }

  &:checked + ${FakeInput} {
    & ${InnerCircle} {
      opacity: 1;
      transform: scale(1);
      background-color: ${theme.color('primary')};
    }

    &:active ${InnerCircle} {
      transform: scale(0.66666);
    }
  }

  &:not([data-background='true']) {
    &:checked + ${FakeInput} {
      border-color: ${theme.color('primary')};

      &:hover {
        border-color: ${theme.color('primary', { variation: 'hover' })};

        & ${InnerCircle} {
          background-color: ${theme.color('primary', { variation: 'hover' })};
        }
      }

      &:focus {
        border-color: ${theme.color('primary', { variation: 'focus' })};
      }
    }
  }

  &:not([data-background='true']):not(:checked):not([data-error='true'])
    + ${FakeInput} {
    border-color: ${palette.darkBlue[400]};
  }

  &[data-error='true'] {
    &:not(:checked) + ${FakeInput} {
      border-color: ${palette.orange[400]};
    }

    & + ${FakeInput}:active, &:checked + ${FakeInput}:focus {
      border-color: ${palette.orange[400]};
    }

    &:checked + ${FakeInput} {
      & ${InnerCircle} {
        background-color: ${palette.orange[400]};
      }
    }

    &:not([data-background='true']) {
      &:checked + ${FakeInput} {
        border-color: ${palette.orange[400]};

        &:hover {
          border-color: ${palette.orange[500]};

          & ${InnerCircle} {
            background-color: ${palette.orange[500]};
          }
        }

        &:focus {
          border-color: ${palette.orange[600]};
        }
      }
    }
  }

  &:disabled {
    & + ${FakeInput} {
      pointer-events: none;
    }

    &:not(:checked) {
      & + ${FakeInput} {
        background-color: ${palette.darkBlue[400]};
      }
    }

    &:checked {
      & + ${FakeInput} ${InnerCircle} {
        background-color: ${palette.darkBlue[400]};
      }
    }
  }

  &:not([data-background='true']):disabled:checked + ${FakeInput} {
    border-color: ${palette.darkBlue[400]};
  }
`