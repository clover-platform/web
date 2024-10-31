'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import { t } from '@easykit/common/utils/locale';
import {Book} from "@/types/pages/book";
import {FC} from "react";
import {Action} from "@clover/public/components/common/action";
import {DotsHorizontalIcon, StarIcon} from "@radix-ui/react-icons";
import {IconMenu} from "@arco-iconbox/react-clover";

export type BookPageProps = {
    data: Book;
}

export const BookPage: FC<BookPageProps> = (props) => {
    useLayoutConfig<BookLayoutProps>({
        path: [
            {
                title: t("知识库"),
                type: "item",
            }
        ],
        active: "home",
    });
    const { data } = props;
    return <div>
        <div className={"flex space-x-4"}>
            <div className={"bg-secondary w-9 h-9 rounded-md overflow-hidden"}>
                <img src={data.logo} alt={"LOGO"} className={"w-full h-full bg-cover"}/>
            </div>
            <div className={"flex-1 space-y-2"}>
                <div className={"text-2xl text-black font-medium"}>{data.name}</div>
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
            </div>
            <div className={"flex space-x-1"}>
                <Action className={"w-8 h-8"}>
                    <StarIcon />
                </Action>
                <Action className={"w-8 h-8"}>
                    <DotsHorizontalIcon />
                </Action>
            </div>
        </div>
    </div>
}
