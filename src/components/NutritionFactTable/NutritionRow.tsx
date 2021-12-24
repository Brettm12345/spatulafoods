import type {FC} from 'react'

import clsx from 'clsx'
import type {Row, TableRowProps} from 'react-table'

import type {NutritionItem} from '../../hooks/useNutritionFacts'
import {Td} from './Td'

type NutritionFactRow = Row<NutritionItem>
interface NutritionRowProps {
  row: NutritionFactRow
  rowProps: TableRowProps
}

export const NutritionRow: FC<NutritionRowProps> = ({row, rowProps}) => {
  return (
    <tr key={`${rowProps.key}-expanded`} className="row-expanded" {...rowProps}>
      {row.cells.map((cell, index) => {
        return (
          <Td
            key={cell.value}
            className={clsx(
              (cell.column as unknown as {isNumeric: boolean}).isNumeric
                ? 'text-right'
                : 'text-left'
            )}
            {...cell.getCellProps()}
          >
            {/* @ts-ignore */}
            {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
              value:
                // @ts-ignore
                cell.column.accessor &&
                // @ts-ignore
                cell.column.accessor(row.original, index),
              row: {...row, original: row.original},
            })}
          </Td>
        )
      })}
    </tr>
  )
}
