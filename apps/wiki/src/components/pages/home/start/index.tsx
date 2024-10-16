import classNames from "classnames";
import {FC, ReactNode} from "react";
import {IconAddFile, IconBook} from "@arco-iconbox/react-clover";

export type StartItem = {
    id: string;
    title: string;
    description: string;
    icon: ReactNode;

}

export const START_ITEMS: StartItem[] = [
    {
        id: "new.file",
        title: t("新建文档"),
        description: t("AI编辑器梳理文档"),
        icon: <IconAddFile className={"text-3xl text-primary"} />
    },
    {
        id: "new.book",
        title: t("新建知识库"),
        description: t("使用知识库整理知识"),
        icon: <IconBook className={"text-3xl text-primary"} />
    }
]

export type HomeStartProps = {
    onClick?: (item: StartItem) => void;
}

export const HomeStart: FC<HomeStartProps> = (props) => {
    return <div className={"flex space-x-4"}>
        {
            START_ITEMS.map((item) => {
                return <div
                    onClick={() => props.onClick?.(item)}
                    key={item.id}
                    className={classNames(
                        "border rounded-md p-2 flex w-64 justify-center items-center cursor-pointer",
                        "hover:bg-secondary hover:text-primary group"
                    )}
                >
                    <div className={"w-12 h-12 flex justify-center items-center"}>
                        {item.icon}
                    </div>
                    <div className={"flex-1"}>
                        <div className={"text-base font-medium"}>{item.title}</div>
                        <div
                            className={"text-sm text-secondary-foreground opacity-50 group-hover:text-primary"}
                        >
                            {item.description}
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}
