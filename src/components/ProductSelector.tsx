import {Fragment} from 'react'
import type {FC} from 'react'

import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import clsx from 'clsx'

import {useShopifyProductsQuery} from '../generated/graphql'
import {Spinner} from './Spinner'

interface ProductSelectorProps {
  value: number
  onChange: (value: number) => void
}

export const ProductSelect: FC<ProductSelectorProps> = ({value, onChange}) => {
  const [{data, fetching}] = useShopifyProductsQuery()
  return (
    <div className="w-96">
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button
            className={clsx(
              'relative w-full py-2 pl-3 pr-10 text-left bg-white',
              'dark:bg-gray-800',
              'rounded-lg shadow-md cursor-default',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 ',
              'focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2',
              'focus-visible:border-indigo-500 sm:text-sm'
            )}
          >
            <span className="block truncate">
              {fetching
                ? 'Loading...'
                : data?.shopifyProducts?.find(product => product.id === value)
                    ?.name ?? 'Select a product'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {fetching ? (
                <Spinner className="size-5" />
              ) : (
                <SelectorIcon
                  className="text-gray-400 size-5"
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsx(
                'absolute w-full py-1 mt-1 overflow-auto text-base z-50',
                'bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 ',
                'ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              )}
            >
              {data?.shopifyProducts?.map(({id, name}) => (
                <Listbox.Option
                  key={id}
                  className={({active}) =>
                    clsx(
                      active
                        ? 'text-sky-900 bg-sky-100 dark:bg-sky-500/20 dark:text-sky-300'
                        : 'text-gray-900 dark:text-gray-200',
                      'cursor-default select-none relative py-2 pl-10 pr-4',
                      'flex items-center'
                    )
                  }
                  value={id}
                >
                  {({selected}) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-500">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
