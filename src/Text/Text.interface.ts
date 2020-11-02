import * as React from 'react'

import { styledAs, ThemeOverridesProps } from '../_internal/types'

export type TextTypes =
  | 'veryLarge'
  | 'large'
  | 'emphasis'
  | 'regular'
  | 'caption'
  | 'captionSmall'

export interface TextProps
  extends ThemeOverridesProps,
    React.HTMLAttributes<HTMLHeadingElement> {
  type?: TextTypes
  color?: string
  opacity?: number
  as?: styledAs
  inline?: boolean
}
