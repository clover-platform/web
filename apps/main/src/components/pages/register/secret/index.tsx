import {FormItem, Input, useMessage} from "@easykit/design";
import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {otpSecret} from "@/rest/auth";
import {OtpInfo} from "@/components/common/account/otp-info";
import { t } from '@clover/public/locale';

export type SecretItemProps = PropsWithChildren<{
    username: string;
}>;

const SecretItem: FC<SecretItemProps> = (props) => {
    const { username } = props;
    const msg = useMessage();
    const [loading, setLoading] = useState(false);
    const [otpData, setOtpData] = useState({} as any);

    const loadSecret = useCallback(async () => {
        setLoading(true);
        const { success, message, data } = await otpSecret(username);
        setLoading(false);
        if(success) {
            setOtpData(data);
        }else{
            msg.error(message);
        }
    }, [username])

    useEffect(() => {
        loadSecret().then();
    }, []);

    return <>
        <FormItem name={"secret"} label={t("身份验证 App 密钥")} className={"hidden"}>
            <Input value={otpData.secret} />
        </FormItem>
        <FormItem name={"qrcode"} label={t("身份验证 App 密钥")}>
            <OtpInfo loading={loading} secret={otpData.secret} qrcode={otpData.qrcode} />
        </FormItem>
    </>
};

export default SecretItem;
