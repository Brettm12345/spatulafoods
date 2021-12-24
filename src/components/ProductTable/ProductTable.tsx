import {PencilIcon} from '@heroicons/react/outline'
import clsx from 'clsx'

import {useProductsQuery} from '../../generated/graphql'
import {Tooltip} from '../Tooltip'

export const ProductTable = () => {
  const [{data}] = useProductsQuery()
  return (
    <table className="bg-white rounded-md shadow-lg dark:bg-gray-800">
      <thead className="border-b border-gray-100 dark:border-gray-700">
        {['Image', 'Name', 'Actions'].map(header => (
          <th key={header} className={clsx('table-cell', 'text-left')}>
            {header}
          </th>
        ))}
      </thead>
      <tbody>
        {data?.products?.map(({image, name, id}) => (
          <tr key={id}>
            <td className="table-cell">
              <img
                alt={image.alt}
                className="rounded-md size-20"
                src={image.src}
              />
            </td>
            <td className="table-cell">{name}</td>
            <td className="table-cell">
              <Tooltip content="Edit">
                <button aria-label="Edit" className="btn-table">
                  <PencilIcon />
                </button>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
