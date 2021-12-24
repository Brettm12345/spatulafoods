import type {FC} from 'react'
import {Fragment} from 'react'
import {useMemo} from 'react'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import type {Column, Row} from 'react-table'
import {useExpanded, useTable} from 'react-table'

import {useDisclosure} from '../../hooks/useDisclosure'
import type {NutritionItem} from '../../hooks/useNutritionFacts'
import {nutritionFactLens} from '../../hooks/useNutritionFacts'
import {useNutritionFacts} from '../../hooks/useNutritionFacts'
import {Button} from '../Button'
import {Tooltip} from '../Tooltip'
import {ExpandButton} from './ExpandButton'
import {NutritionFactModal} from './NutritionFactModal'
import {NutritionRow} from './NutritionRow'
import {Td} from './Td'

type NutritionColumn = Column<NutritionItem>
export const NutritionFactTable: FC = () => {
  const {
    nutritionFacts,
    moveUp,
    moveDown,
    moveSubNutritionFactDown,
    moveSubNutritionFactUp,
    setNutritionFacts,
  } = useNutritionFacts()
  const columns = useMemo<NutritionColumn[]>(
    () => [
      {
        id: 'expander',
        // TODO: Add types for react table
        // @ts-ignore
        Header: ({getToggleAllRowsExpandedProps, isAllRowsExpanded}) => (
          <ExpandButton
            isExpanded={isAllRowsExpanded}
            {...getToggleAllRowsExpandedProps()}
          />
        ),
        width: 100,
        // @ts-ignore
        Cell: ({row}) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <ExpandButton
              isExpanded={row.isExpanded}
              {...row.getToggleRowExpandedProps()}
            />
          ) : null,
        // @ts-ignore
        SubCell: () => null,
      },
      {
        accessor: d => d.ingredient,
        Header: 'Ingredient',
        // @ts-ignore
        SubCell: ({value}) => <span className="pl-4">{value}</span>,
      },
      {
        accessor: 'content',
        Header: 'Content',
        isNumeric: true,
      },
      {
        accessor: 'dailyValue',
        Header: 'Daily Value',
        isNumeric: true,
        Cell: ({value}) => (value ? `${value}%` : null),
      },
      {
        id: 'Actions',
        Header: 'Actions',
        Cell: ({row}: {row: Row<NutritionItem>}) => {
          const {isOpen, onOpen, onClose} = useDisclosure()
          const depth = (row as unknown as {depth: number}).depth
          return (
            <div className="space-x-2">
              <Tooltip content="Delete">
                <button
                  className="btn-table"
                  onClick={
                    depth === 0
                      ? () => {
                          setNutritionFacts(nutritionFacts =>
                            nutritionFacts.filter(
                              fact => fact.id !== row.original.id
                            )
                          )
                        }
                      : () => {
                          const parentIndex = nutritionFacts.findIndex(
                            parent => parent.id === row.original.parentId
                          )
                          setNutritionFacts(
                            nutritionFactLens
                              .k(parentIndex)
                              .ingredients.set(ingredients =>
                                ingredients.filter(
                                  ingredient =>
                                    ingredient.id !== row.original.id
                                )
                              )
                          )
                        }
                  }
                >
                  <TrashIcon />
                </button>
              </Tooltip>
              {depth === 0 && (
                <>
                  <Tooltip content="Add">
                    <button className="btn-table" onClick={onOpen}>
                      <PlusIcon />
                    </button>
                  </Tooltip>
                  <NutritionFactModal
                    onClose={onClose}
                    key={`${row.original.id}-add`}
                    handleSave={({dailyValue, content, ingredient}) => {
                      const parentIndex = nutritionFacts.findIndex(
                        nutritionFact => nutritionFact.id === row.original.id
                      )
                      setNutritionFacts(
                        nutritionFactLens
                          .k(parentIndex)
                          .ingredients.set(ingredients => [
                            ...ingredients,
                            {
                              id:
                                ingredients.length === 0
                                  ? '0'
                                  : (
                                      parseInt(
                                        ingredients[ingredients.length - 1].id
                                      ) + 1
                                    ).toString(),
                              parentId: row.original.id,
                              dailyValue,
                              content,
                              ingredient,
                            },
                          ])
                      )
                    }}
                    isOpen={isOpen}
                  />
                </>
              )}
              <Tooltip content="Edit">
                <button className="btn-table" onClick={onOpen}>
                  <PencilIcon />
                </button>
              </Tooltip>
              <NutritionFactModal
                ingredient={row.original.ingredient}
                id={row.original.id}
                onClose={onClose}
                handleSave={
                  depth === 0
                    ? ({id, dailyValue, content, ingredient}) => {
                        const index = nutritionFacts.findIndex(
                          nutritionFact => nutritionFact.id === id
                        )
                        setNutritionFacts(
                          nutritionFactLens.k(index).set(item => ({
                            ...item,
                            dailyValue,
                            content,
                            ingredient,
                          }))
                        )
                      }
                    : ({id, dailyValue, content, ingredient}) => {
                        const parentIndex = nutritionFacts.findIndex(
                          nutritionFact =>
                            nutritionFact.id === row.original.parentId
                        )
                        const index = nutritionFacts[
                          parentIndex
                        ].ingredients.findIndex(
                          ingredient => ingredient.id === id
                        )
                        setNutritionFacts(
                          nutritionFactLens
                            .k(parentIndex)
                            .ingredients.k(index)
                            .set(item => ({
                              ...item,
                              dailyValue,
                              content,
                              ingredient,
                            }))
                        )
                      }
                }
                dailyValue={row.original.dailyValue}
                content={row.original.content}
                isOpen={isOpen}
              />
            </div>
          )
        },
      },
      {
        id: 'move',
        Header: 'Move',
        Cell: ({row}: {row: Row<NutritionItem>}) => (
          <div className="flex ml-auto space-x-1">
            <Tooltip content="Move Up">
              <button
                aria-label="Move up"
                className="btn-table"
                onClick={() => {
                  moveUp(row.original.id)
                }}
              >
                <ArrowUpIcon />
              </button>
            </Tooltip>
            <Tooltip content="Move Down">
              <button
                className="btn-table"
                onClick={() => {
                  moveDown(row.original.id)
                }}
              >
                <ArrowDownIcon />
              </button>
            </Tooltip>
          </div>
        ),
        SubCell: ({row}: {row: Row<NutritionItem>}) => (
          <div className="flex space-x-1">
            <Tooltip content="Move up">
              <button
                className="btn-table"
                onClick={() => {
                  moveSubNutritionFactUp(row.original.id, row.original.parentId)
                }}
              >
                <ArrowUpIcon />
              </button>
            </Tooltip>
            <Tooltip content="Move Down">
              <button
                className="btn-table"
                onClick={() => {
                  moveSubNutritionFactDown(
                    row.original.id,
                    row.original.parentId
                  )
                }}
              >
                <ArrowDownIcon />
              </button>
            </Tooltip>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moveUp, moveDown]
  )
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable<NutritionItem>(
      {
        columns,
        data: nutritionFacts,
        getSubRows: row => row.ingredients,
        // @ts-ignore
        autoResetExpanded: false,
      },
      useExpanded
    )

  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <div className="flex flex-col">
      {nutritionFacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-2/3 max-w-md px-6 py-8 mx-auto text-center bg-gray-100 dark:bg-gray-800">
          <h4 className="text-2xl">No products yet</h4>
          <Button
            className="mt-4 btn-sky max-w-fit"
            leftIcon={<PlusIcon />}
            onClick={onOpen}
          >
            Add nutrition fact
          </Button>
          <NutritionFactModal
            key="add-from-empty"
            isOpen={isOpen}
            onClose={onClose}
            handleSave={({ingredient, dailyValue, content}) => {
              setNutritionFacts(nutritionFacts => [
                ...nutritionFacts,
                {
                  ingredient,
                  dailyValue,
                  content,
                  id: '0',
                },
              ])
            }}
          />
        </div>
      ) : (
        <>
          <table
            className="bg-white rounded-md shadow-lg dark:bg-gray-800"
            {...getTableProps()}
          >
            <thead className="border-b border-gray-100 dark:border-gray-700">
              {headerGroups.map(headerGroup => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      className={clsx(
                        'table-cell',
                        (column as unknown as {isNumeric: boolean}).isNumeric
                          ? 'text-right'
                          : (column as unknown as {centerHeader: boolean})
                              .centerHeader
                          ? 'text-center'
                          : 'text-left'
                      )}
                      key={column.getHeaderProps().key}
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                const rowProps = row.getRowProps()
                return (
                  <Fragment key={rowProps.key}>
                    {(row as unknown as {depth: number}).depth === 0 ? (
                      <tr {...rowProps}>
                        {row.cells.map(cell => {
                          const {key, ...cellProps} = cell.getCellProps()
                          return (
                            <Td
                              key={key}
                              className={clsx(
                                (cell.column as unknown as {isNumeric: boolean})
                                  .isNumeric
                                  ? 'text-right'
                                  : 'text-left',
                                !(row as unknown as {isExpanded: boolean})
                                  .isExpanded &&
                                  'border-b border-gray-100 dark:border-gray-700'
                              )}
                              {...cellProps}
                            >
                              {cell.render('Cell')}
                            </Td>
                          )
                        })}
                      </tr>
                    ) : (
                      <NutritionRow
                        key={row.id}
                        row={row}
                        rowProps={rowProps}
                      />
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
          <Button
            className="mt-4 btn-sky max-w-fit"
            leftIcon={<PlusIcon />}
            onClick={onOpen}
          >
            Add nutrition fact
          </Button>
          <NutritionFactModal
            key="add"
            isOpen={isOpen}
            onClose={onClose}
            handleSave={({ingredient, dailyValue, content}) => {
              setNutritionFacts(nutritionFacts => [
                ...nutritionFacts,
                {
                  ingredient,
                  dailyValue,
                  content,
                  id: (
                    parseInt(nutritionFacts[nutritionFacts.length - 1].id) + 1
                  ).toString(),
                },
              ])
            }}
          />
        </>
      )}
    </div>
  )
}
