import {DEFAULT_COVER} from "@/config/book";
import {t} from "@easykit/common/utils/locale";
import {Action} from "@clover/public/components/common/action";
import {DotsHorizontalIcon, StarIcon} from "@radix-ui/react-icons";
import {Book} from "@/types/pages/book";
import {FC} from "react";
import {UserList} from "@clover/public/components/common/user-list";

export type HomeHeaderProps = {
    data?: Book;
}

export const HomeHeader: FC<HomeHeaderProps> = (props) => {
    const { data } = props;

    return <div className={"flex space-x-4"}>
        <div className={"bg-secondary w-9 h-9 rounded-md overflow-hidden"}>
            <img src={data?.logo || DEFAULT_COVER} alt={"LOGO"} className={"w-full h-full bg-cover"}/>
        </div>
        <div className={"flex-1 space-y-2"}>
            <div className={"text-2xl text-black font-medium"}>{data?.name}</div>
            <div className={"flex flex-wrap text-secondary-foreground/50"}>
                <div className={"mr-4 space-x-0.5"}>
                    <span className={"font-bold"}>2</span>
                    <span>{t("文章")}</span>
                </div>
                <div className={"mr-4 space-x-0.5"}>
                    <span className={"font-bold"}>2800</span>
                    <span>{t("字")}</span>
                </div>
            </div>
            <UserList items={data?.members}/>
        </div>
        <div className={"flex space-x-1"}>
            <Action className={"w-8 h-8"}>
                <StarIcon/>
            </Action>
            <Action className={"w-8 h-8"}>
                <DotsHorizontalIcon/>
            </Action>
        </div>
    </div>
}
