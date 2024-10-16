import {Progress, TableCell, TableRow, Tooltip} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {LanguageIcon} from "@/components/common/language-icon";
import {LanguageWithCount} from "@/types/pages/public";
import { t } from '@easykit/common/utils/locale';

export type LanguageItemProps = {
    onClick?: () => void;
} & PropsWithChildren<LanguageWithCount>;

export const LanguageItem: FC<LanguageItemProps> = (props) => {
    const { totalEntry, translatedEntry, verifiedEntry } = props;

    const translatedPercent = totalEntry ? Math.ceil(translatedEntry/totalEntry*100) : 0;
    const verifiedPercent = translatedEntry ? Math.ceil(verifiedEntry/translatedEntry*100) : 0;

    return <TableRow onClick={props.onClick}>
        <TableCell>
            <div className={"flex justify-start items-center"}>
                <LanguageIcon code={props.code} className={"mr-2"} /> {props.name}
            </div>
        </TableCell>
        <TableCell>
            <div className={"w-full border rounded-full"}>
                <Progress value={verifiedPercent} style={{width: `${translatedPercent}%`}} />
            </div>
        </TableCell>
        <TableCell className={"text-right"}>
            <Tooltip content={t("翻译·校验")}>
                <div className={"bg-muted inline-flex px-2 py-0.5 rounded-sm text-muted-foreground text-xs"}>
                    <span>{translatedPercent}%</span> · <span>{verifiedPercent}%</span>
                </div>
            </Tooltip>
        </TableCell>
    </TableRow>
}
