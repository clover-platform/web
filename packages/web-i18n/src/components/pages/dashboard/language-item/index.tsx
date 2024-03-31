import {Progress, TableCell, TableRow, Tooltip} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import {LanguageIcon} from "@/components/common/language-icon";
import {Language} from "@/types/pages/public";

export type LanguageItemProps = {
    onClick?: () => void;
} & PropsWithChildren<Language>;

export const LanguageItem: FC<LanguageItemProps> = (props) => {
    return <TableRow onClick={props.onClick}>
        <TableCell>
            <div className={"flex justify-start items-center"}>
                <LanguageIcon code={props.code} className={"mr-2"} /> {props.name}
            </div>
        </TableCell>
        <TableCell>
            <Progress value={80} />
        </TableCell>
        <TableCell className={"text-right"}>
            <Tooltip content={"{#翻译·校验#}"}>
                <div className={"bg-muted inline-flex px-2 py-0.5 rounded-sm text-muted-foreground text-xs"}>
                    <span>80%</span> · <span>0%</span>
                </div>
            </Tooltip>
        </TableCell>
    </TableRow>
}
