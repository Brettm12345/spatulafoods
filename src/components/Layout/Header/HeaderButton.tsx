import type {FC} from 'react'

import clsx from 'clsx'
import Link, {type LinkProps} from 'next/link'
import {useRouter} from 'next/router'

export const HeaderButton: FC<LinkProps> = props => {
  const router = useRouter()
  const isCurrent = router.asPath === props.href
  return (
    <div
      className={clsx(
        'btn btn-light-gray',
        isCurrent && 'bg-blue-100 dark:bg-blue-500/20 text-blue-500'
      )}
    >
      <Link {...props} />
    </div>
  )
}
