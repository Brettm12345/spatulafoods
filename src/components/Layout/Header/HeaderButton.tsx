import clsx from 'clsx'
import {useRouter} from 'next/dist/client/router'
import Link, {LinkProps} from 'next/link'
import {FC} from 'react'

export const HeaderButton: FC<LinkProps> = props => {
  const router = useRouter()
  return (
    <div
      className={clsx('btn btn-light-gray', {
        ['bg-blue-100 dark:bg-blue-500/20 text-blue-500']:
          router.asPath === props.href,
      })}
    >
      <Link {...props} />
    </div>
  )
}
