import * as React from 'react'

import { styledAs } from '../_internal/types'

export default interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  small?: boolean
  error?: boolean
  light?: boolean
  as?: styledAs
  elementRight?: React.ReactNode
  elementLeft?: React.ReactNode
  canReset?: boolean
}
