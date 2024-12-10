import {FC, useCallback, useEffect, useState} from "react";
import {Branch, BranchMergeOverview} from "@/types/pages/branch";
import {
    Alert,
    AlertDescription,
    Button,
    Checkbox,
    Dialog,
    DialogProps,
    Loading,
    Separator,
    Space,
    useMessage
} from "@easykit/design";
import {IconBranch} from "@arco-iconbox/react-clover";
import classNames from "classnames";
import {i18n} from "@clover/public/locale";
import {mergeOverview, merge as mergeRest} from "@/rest/branch";
import {CheckedState} from "@radix-ui/react-checkbox";
import { t } from '@clover/public/locale';
import {useParams} from "next/navigation";

export type MergeBranchModalProps = {
    onSuccess?: () => void;
    branch: Branch;
} & DialogProps;

export const MergeBranchModal: FC<MergeBranchModalProps> = (props) => {
    const { module } = useParams();
    const { branch, onSuccess } = props;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const itemClassName = "flex-1 flex justify-center items-center";
    const [overview, setOverview] = useState<BranchMergeOverview|null>();
    const msg = useMessage();
    const [deleteAfterMerge, setDeleteAfterMerge] = useState<CheckedState>(false);

    const loadOverview = async () => {
        setLoading(true);
        const { success, data } = await mergeOverview(module as string, branch.id);
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

    const merge = useCallback(async () => {
        setSubmitting(true);
        const { success, message } = await mergeRest({
            id: branch.id,
            module: module as string,
            deleteAfterMerge: !!deleteAfterMerge
        })
        setSubmitting(false);
        if(success) {
            onSuccess?.();
        }else{
            msg.error(message);
        }
    }, [deleteAfterMerge, branch, module])

    return <Dialog
        {...props}
        title={t("合并分支")}
        maskClosable={false}
    >
        <Loading loading={loading} className={"space-y-4"}>
            <Alert>
                <IconBranch />
                <AlertDescription>
                    <ul className={"list-disc ml-4 text-muted-foreground leading-relaxed"}>
                        <li>{t("如果源字符串或标识符（key）被修改（匹配重复的标准），则会认为该字符串已被删除/添加（旧的删除，新的添加）。")}</li>
                        <li>{t("在分支上修改的翻译将被合并在一起（自己的和共享的），并保留批准和投票。")}</li>
                        <li>{t("合并摘要仅包括源字符串的统计信息。字符串的翻译、投票和批准也将被合并。")}</li>
                    </ul>
                </AlertDescription>
            </Alert>
            <div className={"flex w-full border justify-center items-center rounded-md p-2"}>
                <div className={classNames(itemClassName, "text-destructive")}>
                    {i18n(t("%size 条删除"), {size: overview ? overview?.deleted : '--'})}
                </div>
                <Separator className={"h-6"} orientation={"vertical"}/>
                <div className={classNames(itemClassName, "text-success-foreground")}>
                    {i18n(t("%size 条添加"), {size: overview ? overview?.added : '--'})}
                </div>
                <Separator className={"h-6"} orientation={"vertical"}/>
                <div className={classNames(itemClassName, "text-warning-foreground")}>
                    {i18n(t("%size 条变更"), {size: overview ? overview?.changed : '--'})}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    checked={deleteAfterMerge}
                    onCheckedChange={setDeleteAfterMerge}
                    id="terms"/>
                <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {t("合并后删除分支")}
                </label>
            </div>
            <Space className={"justify-end"}>
                <Button
                    onClick={merge}
                    loading={submitting}
                    type={"button"}
                >
                    {t("合并")}
                </Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </Space>
        </Loading>
    </Dialog>
}
