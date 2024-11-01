import {User} from "@clover/public/types/account";
import {FC} from "react";
import classNames from "classnames";

export type UserItemProps = {
    info: User;
    className?: string;
}

export const UserItem: FC<UserItemProps> = (props) => {
    const { className, info } = props;
    const firstLetter = info.username[0].toUpperCase();
    return <div className={classNames("", className)}>
        { info.avatar ? <img src={info.avatar} alt={"avatar"}/> : firstLetter }
    </div>
}
