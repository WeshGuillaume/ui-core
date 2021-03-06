import * as React from 'react'

import { styledAs } from '../_internal/types'
import { Color } from '../color'

export interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * background of the element
   */
  backgroundColor: Color

  /**
   * opacity of the background
   */
  opacity?: number

  /**
   * if true, it won't apply the theme background to the DOM element. It allows to "fake" the background property for children.
   * @default false
   */
  simulated?: boolean

  /**
   * @ignore
   */
  as?: styledAs
}
