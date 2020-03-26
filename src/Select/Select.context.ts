import * as React from 'react'

import { SelectContextValue } from './Select.interface'

const SelectContext = React.createContext<SelectContextValue>({
  multi: false,
  small: false,
  tiny: false,
  canSelectAll: false,
})

export default SelectContext