import type { FC } from 'react'
import { UserItem } from '@clover/public/components/common/user-item'
import type { User } from '@clover/public/types/account'

export type UserListProps = {
  items?: User[]
}

export const UserList: FC<UserListProps> = (props) => {
  const { items } = props
  return items?.length ? (
    <div className="ml-2 flex flex-wrap">
      {items.map((item) => (
        <UserItem className="-ml-2" info={item} key={item.id} />
      ))}
    </div>
  ) : null
}
