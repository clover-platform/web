import {Activity} from "@/types/pages/activity";
import {FC, ReactNode, useMemo} from "react";
import {Avatar} from "@easykit/design";
import dayjs from "dayjs";
import {IconAdd, IconDelete} from "@arco-iconbox/react-clover";
import {CheckIcon, Cross2Icon, Pencil1Icon} from "@radix-ui/react-icons";
import {i18n} from "@easy-kit/i18n/utils";
import { t } from '@easykit/common/utils/locale';

const ICONS: Record<number, ReactNode> = {
    1: <IconAdd />,
    2: <Pencil1Icon />,
    3: <IconDelete />,
    4: <CheckIcon />,
    5: <Cross2Icon />
}

const LABELS: Record<number, string> = {
    1: t("新增了"),
    2: t("更新了"),
    3: t("删除了"),
    4: t("通过了"),
    5: t("拒绝了")
}

const TYPES: Record<number, string> = {
    1: t("模块"),
    2: t("分支"),
    3: t("下载"),
    4: t("成员"),
    5: t("设置"),
    6: t("词条")
}

const TYPE6_SUB_TYPES: Record<number, string> = {
    1: t("词条"),
    2: t("翻译"),
    3: t("评论"),
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
            return i18n(t("词条的%type"), {type: TYPE6_SUB_TYPES[subType]});
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
                i18n(t("%operate%type：%content"), {
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
