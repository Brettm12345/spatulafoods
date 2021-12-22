import type {ChangeEventHandler} from 'react'
import {useState} from 'react'

type HandleChange = ChangeEventHandler<HTMLInputElement>
type UseTextInputReturn = [string, HandleChange]
type UseTextInput = (initial?: string) => UseTextInputReturn
export const useTextInput: UseTextInput = (initial = '') => {
  const [value, setValue] = useState(initial)
  const handleChange: HandleChange = event => {
    setValue(event.target.value)
  }
  return [value, handleChange]
}
