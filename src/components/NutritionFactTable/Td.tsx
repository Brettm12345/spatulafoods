import type {FC, DetailedHTMLProps, TdHTMLAttributes} from 'react'

import clsx from 'clsx'

export const Td: FC<
  DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >
> = ({className, ...props}) => (
  <td className={clsx(className, 'table-cell')} {...props} />
)
