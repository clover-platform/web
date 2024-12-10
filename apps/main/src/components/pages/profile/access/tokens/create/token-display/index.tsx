import {FC, useCallback, useMemo, useState} from "react";
import {Alert, AlertDescription, AlertTitle, useAlert, useMessage} from "@easykit/design";
import {CheckCircledIcon, CopyIcon, EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import { t } from "@clover/public/locale";
import {Action} from "@clover/public/components/common/action";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export type TokenDisplayProps = {
    token: string;
}

export const TokenDisplay: FC<TokenDisplayProps> = (props) => {
    const { token } = props;
    const [visible, setVisible] = useState(false);
    const msg = useMessage();

    const content = useMemo(() => {
        if(visible) return token;
        return token.replace(/./g, "*");
    }, [token, visible])

    const toggle = useCallback(() => {
        setVisible(!visible);
    }, [visible])

    return <Alert className={"bg-success"}>
        <AlertTitle className={"flex justify-start items-center mb-2 space-x-1"}>
            <CheckCircledIcon />
            <div>{t("您的新个人访问令牌")}</div>
        </AlertTitle>
        <AlertDescription className={"space-y-1"}>
            <div className={"bg-white border rounded-sm flex justify-center items-center"}>
                <div className={"flex-1 px-2"}>{content}</div>
                <Action onClick={toggle} className={"rounded-none"}>
                    { visible ? <EyeOpenIcon/> : <EyeClosedIcon/> }
                </Action>
                <CopyToClipboard text={token} onCopy={() => {
                    msg.success(t("已复制到剪贴板"));
                }}>
                    <Action className={"rounded-none rounded-r"}><CopyIcon/></Action>
                </CopyToClipboard>
            </div>
            <div className={"text-secondary-foreground/50"}>{t("请确保妥善保存它，您无法再次访问它的内容。")}</div>
        </AlertDescription>
    </Alert>
}
