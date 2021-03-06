import * as React from 'react'

import { MenuProps } from '../Menu'

export interface ConfirmMenuProps
  extends Omit<
    MenuProps,
    | 'onClose'
    | 'open'
    | 'triggerRef'
    | 'triggerElement'
    | 'position'
    | 'scrollable'
  > {
  /**
   * Use labels instead of icons
   * @default false
   */
  textual?: boolean
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactElement<any>
  triggerRef?: React.RefObject<HTMLElement>
  position?: 'right' | 'left'
}
