import * as React from 'react'

import { ThemeProvider } from '../ThemeProvider'

import { BackgroundProps } from './Background.interface'
import { BackgroundContainer } from './Background.style'

export const Background = React.forwardRef<HTMLDivElement, BackgroundProps>(
  (props, ref) => {
    const { backgroundColor, opacity = 1, simulated, ...rest } = props

    return (
      <ThemeProvider backgroundColor={backgroundColor}>
        <BackgroundContainer
          ref={ref}
          {...rest}
          backgroundColor={backgroundColor}
          opacity={opacity}
          data-simulated={simulated}
        />
      </ThemeProvider>
    )
  }
)
