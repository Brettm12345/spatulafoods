import type {ChangeEvent, FC} from 'react'
import {useState} from 'react'
import {Fragment} from 'react'

import {Dialog, Transition} from '@headlessui/react'
import clsx from 'clsx'

import {MeasurementType} from '../../generated/graphql'
import type {NutritionItem} from '../../hooks/useNutritionFacts'
import {useTextInput} from '../../hooks/useTextInput'
import {getMeasurementType} from '../../util/products'
import {Button} from '../Button'

interface Info {
  action: string
  title: string
}

type Actions = 'update' | 'create'
type ActionInfo = Record<Actions, Info>

interface NutritionFactModalProps extends Partial<NutritionItem> {
  isOpen: boolean
  onClose: () => void
  handleSave: (item: NutritionItem) => void
}

export const NutritionFactModal: FC<NutritionFactModalProps> = ({
  ingredient,
  content,
  id,
  dailyValue,
  isOpen,
  onClose,
  handleSave,
}) => {
  const [currentIngredient, setIngredient] = useTextInput(ingredient)
  const [currentDailyValue, setDailyValue] = useTextInput(
    dailyValue?.toString() ?? ''
  )
  const [currentContent, setCurrentContent] = useTextInput(
    content?.replace(/[^\d]/g, '') ?? ''
  )
  const [contentType, setContentType] = useState(
    content ? getMeasurementType(content) : MeasurementType.Grams
  )

  const actionInfo: ActionInfo = {
    create: {
      action: 'Create Nutrition Fact',
      title: 'Create Nutrition Fact',
    },
    update: {
      action: 'Edit Nutrition Fact',
      title: 'Edit Nutrition Fact',
    },
  }

  const onSave = () => {
    handleSave({
      id,
      ingredient: currentIngredient,
      dailyValue: parseFloat(currentDailyValue),
      content: `${parseFloat(currentContent)}${
        contentType === MeasurementType.Millagrams
          ? 'mg'
          : contentType === MeasurementType.Grams
          ? 'g'
          : ''
      }`,
    })
    const emptyEvent = {target: {value: null}} as ChangeEvent<HTMLInputElement>
    setIngredient(emptyEvent)
    setDailyValue(emptyEvent)
    setCurrentContent(emptyEvent)
    setContentType(null)
    onClose()
  }
  const {action, title} = actionInfo[!id ? 'create' : 'update']

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/20" />
          </Transition.Child>
        </div>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={clsx(
              'fixed top-0 w-11/12 max-w-md px-4 py-4 my-8 ',
              'align-middle -translate-x-1/2',
              'bg-white dark:bg-gray-700 rounded-2xl left-1/2'
            )}
          >
            <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
            <div className="mt-6">
              <div className="mb-6">
                <label htmlFor="question" className="form-label">
                  Ingredient
                </label>
                <input
                  id="ingredient"
                  className="input"
                  value={currentIngredient}
                  onChange={setIngredient}
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="content"
                    onChange={setCurrentContent}
                    value={currentContent}
                    id="content"
                    className="block w-full pr-12 border-gray-300 rounded-md input focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="unit" className="sr-only">
                      Unit
                    </label>
                    <select
                      id="unit"
                      name="unit"
                      className="h-full py-0 pl-2 text-gray-600 bg-transparent border-transparent rounded-md dark:text-gray-400 max-w-fit focus:ring-blue-500 focus:border-blue-500 pr-7 sm:text-sm"
                      value={contentType}
                      onChange={event => {
                        setContentType(event.target.value as MeasurementType)
                      }}
                    >
                      <option value={MeasurementType.Millagrams}>
                        Milligrams
                      </option>
                      <option value={MeasurementType.Grams}>Grams</option>
                      <option value={MeasurementType.Units}>Units</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="question" className="form-label">
                  Daily Value
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="dailyValue"
                    className="input"
                    type="number"
                    value={currentDailyValue}
                    onChange={setDailyValue}
                    placeholder=""
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-600 sm:text-sm dark:text-gray-400">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-end mt-4 space-x-2">
                <Button className="btn-sm btn-light-gray" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="btn-sm btn-sky"
                  disabled={ingredient === ''}
                  onClick={onSave}
                >
                  {action}
                </Button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
