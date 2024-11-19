import { FC, HTMLAttributes, useState } from "react";
import { Checkbox, CheckboxProps, Input, ScrollArea } from "@easykit/design";
import classNames from "classnames";
import { Action } from "@clover/public/components/common/action";
import { IconDelete } from "@arco-iconbox/react-clover";
import { useAtom } from "jotai";
import { languagesState } from "@/state/public";
import { t } from '@easykit/common/utils/locale';

export type MultiLanguageSelectProps = {
    className?: string;
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
}

export type OptionProps = {
    label: string;
    value: string;
}

type LangItemProps = OptionProps & Pick<CheckboxProps, any>;

const LangItem: FC<LangItemProps> = (props) => {
    const [idPrefix] = useState(Date.now());
    const id = `${idPrefix}-${props.value}`;

    return <div className={classNames(
        "rounded-sm h-8 flex items-center space-x-2 px-2",
        "hover:bg-muted"
    )}>
        <Checkbox id={id} onCheckedChange={props.onCheckedChange} checked={props.checked} />
        <label
            htmlFor={id}
            className="p-1 flex-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            { props.label }
        </label>
    </div>
}

type SelectedLangItemProps = HTMLAttributes<HTMLDivElement> & OptionProps;

const SelectedLangItem: FC<SelectedLangItemProps> = (props) => {
    return <div
        {...props}
        className={classNames(
            "rounded-sm h-8 flex justify-start items-center px-2",
            "hover:bg-[rgba(0,0,0,0.05)] hover:line-through hover:text-destructive",
            props.className
        )}
    >
        { props.label }
    </div>
}

export const MultiLanguageSelect: FC<MultiLanguageSelectProps> = (props) => {
    const [selected, setSelected] = useState<string[]>(props.value || []);
    const [keyword, setKeyword] = useState<string>("");
    const [languages] = useAtom(languagesState);

    const options = languages.map((lang) => {
        return {
            label: lang.name,
            value: lang.code,
        }
    });

    const selectedOptions = options.filter((option) => selected.includes(option.value));
    const filteredOptions = options.filter(
        (option) =>
            option.label.toLowerCase().includes(keyword.toLowerCase())
            || option.value.toLowerCase().includes(keyword.toLowerCase())
    );

    return <div className={classNames("relative", props.className)}>
        <div className={"flex justify-start items-start border rounded-md"}>
            <div className={"flex-1 h-96 border-r flex justify-start items-start flex-col"}>
                <div className={"p-2 border-b w-full"}>
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder={t("请输入关键词")}
                    />
                </div>
                <div className={"w-full flex-1 h-0 flex-shrink-0"}>
                    <ScrollArea className="w-full h-full">
                        <div className={"p-2"}>
                            {
                                filteredOptions.map((option) => {
                                    return <LangItem
                                        key={option.value}
                                        {...option}
                                        checked={selected.includes(option.value)}
                                        onCheckedChange={(checked: boolean) => {
                                            const newSelected = checked ? [...selected, option.value] : selected.filter((v) => v !== option.value);
                                            setSelected(newSelected);
                                            props.onChange?.(newSelected);
                                        }}
                                    />
                                })
                            }
                        </div>
                    </ScrollArea>
                </div>
            </div>
            <div className={"flex-1 h-96 border-r flex justify-start items-start flex-col bg-muted"}>
                <div className={"p-2 border-b w-full flex justify-center items-center"}>
                    <div className={"flex-1"}>{t("已选")}</div>
                    <Action
                        onClick={() => {
                            setSelected([]);
                            props.onChange?.([]);
                        }}
                        theme={"dark"}
                        className={"h-9 w-9"}
                    >
                        <IconDelete />
                    </Action>
                </div>
                <div className={"w-full flex-1 h-0 flex-shrink-0"}>
                    <ScrollArea className="w-full h-full">
                        <div className={"p-2"}>
                            {
                                selectedOptions.length ? selectedOptions.map((option) => {
                                    return <SelectedLangItem
                                        key={option.value}
                                        {...option}
                                        onClick={() => {
                                            const newSelected = selected.filter((v) => v !== option.value);
                                            setSelected(newSelected);
                                            props.onChange?.(newSelected);
                                        }}
                                    />;
                                }) : <div className={"p-6 flex justify-center items-center opacity-60"}>
                                    { props.placeholder || t("暂无选中") }
                                </div>
                            }
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    </div>
}
