import {UserItem} from "@clover/public/components/common/user-item";
import type { User } from '@clover/public/types/account'
import type { FC } from 'react'

export type UserListProps = {
  items?: User[];
}

export const UserList: FC<UserListProps> = (props) => {
  const { items } = props
  return items?.length ? (
    <div className="ml-2 flex flex-wrap">
      {items.map((item) => (
        <UserItem key={item.id} info={item} className="-ml-2" />
      ))}
    </div>
  ) : null
}
