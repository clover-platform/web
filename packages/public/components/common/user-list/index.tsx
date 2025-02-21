import {User} from "@clover/public/types/account";
import {FC} from "react";
import {UserItem} from "@clover/public/components/common/user-item";

export type UserListProps = {
  items?: User[];
}

export const UserList: FC<UserListProps> = (props) => {
  const {items} = props;
  return (items && items.length) ? <div className={"flex flex-wrap ml-2"}>
    {items?.map((item) => <UserItem key={item.id} info={item} className={"-ml-2"}/>)}
  </div> : null
}
