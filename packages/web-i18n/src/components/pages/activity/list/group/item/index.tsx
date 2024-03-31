import {Activity} from "@/types/pages/activity";
import {FC, ReactNode, useMemo} from "react";
import {Avatar} from "@atom-ui/core";
import dayjs from "dayjs";
import {IconAdd, IconDelete} from "@arco-iconbox/react-clover";
import {CheckIcon, Cross2Icon, Pencil1Icon} from "@radix-ui/react-icons";
import {i18n} from "@easy-kit/i18n/utils";

const ICONS: Record<number, ReactNode> = {
    1: <IconAdd />,
    2: <Pencil1Icon />,
    3: <IconDelete />,
    4: <CheckIcon />,
    5: <Cross2Icon />
}

const LABELS: Record<number, string> = {
    1: "{#新增了#}",
    2: "{#更新了#}",
    3: "{#删除了#}",
    4: "{#通过了#}",
    5: "{#拒绝了#}"
}

const TYPES: Record<number, string> = {
    1: "{#模块#}",
    2: "{#分支#}",
    3: "{#下载#}",
    4: "{#成员#}",
    5: "{#设置#}",
    6: "{#词条#}"
}

const TYPE6_SUB_TYPES: Record<number, string> = {
    1: "{#词条#}",
    2: "{#翻译#}",
    3: "{#评论#}",
}

export type ActivityListGroupItemProps = {
    item: Activity;
}

export const ActivityListGroupItem: FC<ActivityListGroupItemProps> = (props) => {
    const { item } = props;
    const {
        operate,
        type,
        subType,
        detail,
    } = item;

    const typeText = useMemo(() => {
        if(type === 6 && subType) {
            return i18n("{#词条的%type#}", {type: TYPE6_SUB_TYPES[subType]});
        }
        return TYPES[type];
    }, [type, subType])

    const content = useMemo(() => {
        if(type === 1) {
            return detail?.name;
        }else if(type === 2) {
            return detail?.name;
        }else if(type === 3) {
            return detail?.name;
        }else if(type === 4) {
            return detail?.name;
        }else if(type === 5) {
            return detail?.name;
        }else if(type === 6) {
            if(subType === 1) {
                return detail?.value;
            }else if(subType === 2) {
                return detail?.content;
            }else if(subType === 3) {
                return detail?.content;
            }
            return "--"
        }
        return "--";
    }, [detail, type, subType])

    return <div className={"flex justify-center items-start"}>
        <div className={"relative"}>
            <Avatar className={"w-10 h-10"} src={""} fallback={"S"} />
            <div className={"absolute bottom-0 -right-2 h-6 w-6 bg-white border rounded-full flex justify-center items-center"}>
                {ICONS[operate]}
            </div>
        </div>
        <div className={"flex-1 mx-4 min-h-10 flex justify-start items-center"}>
            {
                i18n("{#%operate%type：%content#}", {
                    operate: LABELS[operate],
                    type: typeText,
                    content: content||'--',
                })
            }
        </div>
        <div className={"text-muted-foreground min-h-10 flex justify-start items-center"}>
            { dayjs(item.createTime).format('HH:mm') }
        </div>
    </div>
}
