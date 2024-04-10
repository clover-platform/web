import {FC, useEffect, useState} from "react";
import {Branch, BranchMergeOverview} from "@/types/pages/branch";
import {Alert, AlertDescription, Button, Checkbox, Dialog, DialogProps, Loading, Separator, Space} from "@atom-ui/core";
import {IconBranch} from "@arco-iconbox/react-clover";
import classNames from "classnames";
import {i18n} from "@easy-kit/i18n/utils";
import {mergeOverview} from "@/rest/branch";

export type MergeBranchModalProps = {
    onSuccess?: () => void;
    branch: Branch;
} & DialogProps;

export const MergeBranchModal: FC<MergeBranchModalProps> = (props) => {
    const { branch } = props;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const itemClassName = "flex-1 flex justify-center items-center";
    const [overview, setOverview] = useState<BranchMergeOverview|null>();

    const loadOverview = async () => {
        setLoading(true);
        const { success, data } = await mergeOverview(branch.id);
        setLoading(false);
        if(success) setOverview(data);
    }

    useEffect(() => {
        if(props.visible) {
            loadOverview().then();
        }else{
            setOverview(null);
        }
    }, [props])

    return <Dialog
        {...props}
        title={"{#合并分支#}"}
        maskClosable={false}
    >
        <Loading loading={loading} className={"space-y-4"}>
            <Alert>
                <IconBranch/>
                <AlertDescription>
                    <ul className={"list-disc ml-4 text-muted-foreground leading-relaxed"}>
                        <li>{"{#如果源字符串或标识符（key）被修改（匹配重复的标准），则会认为该字符串已被删除/添加（旧的删除，新的添加）。#}"}</li>
                        <li>{"{#在分支上修改的翻译将被合并在一起（自己的和共享的），并保留批准和投票。#}"}</li>
                        <li>{"{#合并摘要仅包括源字符串的统计信息。字符串的翻译、投票和批准也将被合并。#}"}</li>
                    </ul>
                </AlertDescription>
            </Alert>
            <div className={"flex w-full border justify-center items-center rounded-md p-2"}>
                <div className={classNames(itemClassName, "text-destructive")}>
                    {i18n("{#%size 条删除#}", {size: overview ? overview?.deleted : '--'})}
                </div>
                <Separator className={"h-6"} orientation={"vertical"}/>
                <div className={classNames(itemClassName, "text-success-foreground")}>
                    {i18n("{#%size 条添加#}", {size: overview ? overview?.added : '--'})}
                </div>
                <Separator className={"h-6"} orientation={"vertical"}/>
                <div className={classNames(itemClassName, "text-warning-foreground")}>
                    {i18n("{#%size 条变更#}", {size: overview ? overview?.changed : '--'})}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms"/>
                <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {"{#合并后删除分支#}"}
                </label>
            </div>
            <Space className={"justify-end"}>
                <Button loading={submitting} type={"button"}>{"{#合并#}"}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {"{#取消#}"}
                </Button>
            </Space>
        </Loading>
    </Dialog>
}
