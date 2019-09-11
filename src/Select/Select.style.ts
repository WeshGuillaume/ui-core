import styled from 'styled-components'

import Icon from '../Icon'
import palette from '../palette'
import theme from '../theme'

export const Placeholder = styled.div`
  flex: 1 1 100%;
  align-self: stretch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 150ms ease-in-out;
  color: ${theme.textColor('base')};
  &[data-empty='true'] {
    color: ${theme.textColor('placeholder')};
  }
`

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 0 0 auto;
  display: block;
  font-family: ${theme.font()};
  font-size: 16px;
  color: ${theme.textColor('base')};
  background-color: ${palette.darkBlue[200]};

  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: solid 1.5px ${palette.darkBlue[200]};
  border-radius: 4px;

  transition: all 150ms ease-in-out;

  &:disabled,
  &[data-disabled='true'] {
    border-color: ${palette.darkBlue[200]};
    background-color: ${palette.darkBlue[200]};
    color: ${palette.darkBlue[700]};
    pointer-events: none;

    &[data-background='true'] {
      background-color: ${theme.color('background', {
        opacity: 0.9,
        useRootTheme: true,
      })};
    }

    &::placeholder,
    ${Placeholder} {
      color: ${theme.textColor('disabledPlaceholder')};
    }
  }

  &:hover,
  &:focus,
  &[data-open='true'] {
    border-color: ${palette.darkBlue[300]};
  }

  &:focus,
  &[data-open='true'] {
    background-color: #fff;
  }
`

export const SelectContent = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  box-sizing: border-box;
  cursor: pointer;

  z-index: 0;
  padding: 8px 16px;
  height: 40px;
  line-height: 24px;

  font-size: ${theme.font('text')};
  user-select: none;

  &[data-open='true'] {
    transition: z-index ease-in 0s;
    z-index: 10;
  }
`

export const SearchInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  flex: 1 1 100%;

  border: none;
  padding: 0;
  background: none;
  font-size: inherit;
  align-self: stretch;
  min-width: 0;
  transition: color 150ms ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: none;

    &::placeholder {
      opacity: 0;
    }
  }
`

export const LabelIcons = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 100%;

  span {
    font-size: 18px;
    margin-left: 6px;
  }
`

export const CustomIconContainer = styled.div`
  margin-right: 8px;
  align-self: stretch;
`

export const ResetIcon = styled(Icon)`
  transition: opacity 150ms ease-in-out;

  &:not([data-visible='true']) {
    opacity: 0;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99998;
`