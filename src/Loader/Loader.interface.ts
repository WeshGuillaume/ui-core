import * as React from 'react'

export interface LoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * @default true
   */
  colored?: boolean

  /**
   * @default medium
   */
  size?: 'large' | 'medium' | 'small'

  /**
   * @default false
   */
  outline?: boolean
}
