import { TextInputProps } from '../TextInput'

export interface AutocompleteInputProps extends TextInputProps {
  options?: string[]
  onOptionSelect?: (option: string) => void
  loading?: boolean
}

export type AutocompleteState = {
  open: boolean
  activeOptionIndex: number | null
}

export enum AutocompleteActionTypes {
  setOpen = 0,
  setActiveOptionIndex = 1,
  resetActiveOption = 2,
}

export type AutocompleteActions =
  | { type: AutocompleteActionTypes.setOpen; value: boolean }
  | { type: AutocompleteActionTypes.setActiveOptionIndex; value: number }
  | { type: AutocompleteActionTypes.resetActiveOption }
