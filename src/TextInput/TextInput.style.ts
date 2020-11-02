import styled, { css } from 'styled-components'

import { breakpoints } from '../breakpoints'
import { Icon } from '../Icon'
import { palette } from '../palette'
import { theme } from '../theme'

export const inputStyle = css`
  font-family: ${theme.font()};
  font-size: 16px;

  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 4px;
  border: solid 1.5px transparent;

  transition: all 150ms ease-in-out;

  &:disabled {
    pointer-events: none;
  }

  &:not([data-light='true']) {
    border-color: ${palette.darkBlue[200]};
    color: ${theme.textColor({ useRootTheme: true })};
    background-color: ${palette.darkBlue[200]};

    &::placeholder {
      color: ${theme.textColor({ opacity: 0.6, useRootTheme: true })};
    }

    &:disabled {
      background-color: ${palette.darkBlue[200]};
      color: ${palette.darkBlue[700]};
      pointer-events: none;

      &::placeholder {
        color: ${theme.textColor({ opacity: 0.4, useRootTheme: true })};
      }
    }

    &:hover,
    &:focus {
      border-color: ${palette.darkBlue[300]};
    }

    &:focus {
      background-color: #fff;
    }

    &[data-background='true'] {
      background-color: #fff;
      border-color: #fff;
    }

    &[data-error='true'] {
      border-color: ${palette.orange[400]};
      box-shadow: 0 1px 0 ${palette.orange[400]};
    }
  }

  &[data-light='true'] {
    color: ${theme.color('primary')};
    background-color: unset;
    font-size: 18px;
    padding-left: 12px;
    padding-right: 12px;

    &:hover:not(:focus) {
      background-color: ${palette.darkBlue[200]};
    }

    &:focus {
      border-color: ${palette.darkBlue[300]};
      color: ${theme.textColor({ useRootTheme: true })};
    }
  }

  &[data-error='true'] {
    color: ${palette.orange[400]};
  }

  @media (${breakpoints.below.phone}) {
    font-size: 14px;
  }
`

export const LeftElementContainer = styled.div`
  position: absolute;
  top: 0;
  left: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: ${theme.font()};
  transition: all ease-in-out 150ms;

  &[data-light='true'] {
    right: 12px;
  }
`

export const RightElementContainer = styled.div`
  position: absolute;
  top: 0;
  right: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: ${theme.font()};

  &[data-light='true'] {
    right: 12px;
  }
`

export const Input = styled.input`
  flex: 1;
  margin: 0;
  padding: 0 16px;
  max-height: 48px;
  min-height: 48px;
  max-width: 100%;
  min-width: 0;
  width: 100%;

  &:focus + ${LeftElementContainer} {
    color: ${theme.color('primary')};
  }

  &[data-small='true'] {
    padding: 0 12px;
    min-height: 36px;
    max-height: 36px;
  }

  &[data-padding-left='true'] {
    padding-left: 48px;
  }

  ${inputStyle};
`

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  color: ${theme.textColor({ useRootTheme: true })};

  &:hover,
  &:focus-within {
    color: ${theme.textColor({ useRootTheme: true })};
  }
`

export const IconButton = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`
