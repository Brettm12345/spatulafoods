import Creatable, {CreatableProps} from 'react-select/creatable'
import React, {FC} from 'react'
import {GroupBase} from 'react-select'
import {SelectComponents} from 'react-select/dist/declarations/src/components'
import {components} from 'react-select'
import classNames from 'classnames'

export interface Option {
  label: string
  value: string
}
const newComponents: Partial<
  SelectComponents<Option, true, GroupBase<Option>>
> = {
  Input: props => (
    <components.Input
      className={classNames(props.className, 'bg-red-500')}
      {...props}
    />
  ),
  SingleValue: props => {
    return (
      <components.SingleValue
        {...props}
        className="text-red.500"
      ></components.SingleValue>
    )
  },
}
export const Select: FC<CreatableProps<Option, true, GroupBase<Option>>> =
  props => <Creatable components={newComponents} {...props} />
