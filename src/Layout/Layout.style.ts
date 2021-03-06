import styled, { css } from 'styled-components'

import {
  ActionBarContainer,
  ActionBarContent,
} from '../ActionBar/ActionBar.style'
import { Background } from '../Background'
import { breakpoints } from '../breakpoints'
import { HeaderBarContainer } from '../HeaderBar/HeaderBar.style'

const style = css`
  padding: var(--layout-top-padding) var(--layout-right-padding)
    var(--layout-bottom-padding) var(--layout-left-padding);

  &[data-has-action-bar='true'] {
    --layout-bottom-padding: 0 !important;

    & ${ActionBarContainer} {
      @media (${breakpoints.above.phone}) {
        margin: 0 calc(0px - var(--layout-right-padding)) 0
          calc(0px - var(--layout-left-padding));
        position: sticky;
        bottom: 0;

        & ${ActionBarContent} {
          padding-top: 24px;
          padding-bottom: 24px;
          height: auto;
        }
      }

      @media (${breakpoints.below.phone}) {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }

  &[data-has-header-bar='true'] {
    --layout-top-padding: 0 !important;

    & ${HeaderBarContainer} {
      position: sticky;
      top: 0;
      margin: 0 calc(0px - var(--layout-right-padding)) 24px
        calc(0px - var(--layout-left-padding));
    }
  }
`

export const LayoutColoredContainer = styled(Background)`
  ${style}
`

export const LayoutTransparentContainer = styled.div`
  ${style}
`
