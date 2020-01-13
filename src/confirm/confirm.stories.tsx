import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import withGrid from '../_internal/StorybookGrid'
import Button from '../Button'
import ButtonProps from '../Button/Button.interface'

import confirm from './confirm'

const GRID_PROPS = {
  children: 'Click me!',
}

const GRID_LINES = [{ title: 'Prompt modals' }]

const GRID_ITEMS = [
  {
    label: 'Confirm',
    props: {
      onClick: async () => {
        const response = await confirm({
          message: 'Are you sure ?',
          confirmLabel: 'Yes',
          cancelLabel: 'No',
        })

        action('Confirm Modal response')(response)
      },
    },
  },
]

const Grid = withGrid<ButtonProps>({
  props: GRID_PROPS,
  lines: GRID_LINES,
  items: GRID_ITEMS,
  itemHorizontalSpace: 24,
})(Button)

storiesOf('Modals|prompt', module).add('grid', () => <Grid />)