import { FormItem, useMessage } from "@easykit/design";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import {otpSecret} from "@/rest/auth";
import OtpInfo from "@/components/common/account/otp-info";

const SecretItem: FC<PropsWithChildren> = (props) => {
    const msg = useMessage();
    const [loading, setLoading] = useState(false);
    const [otpData, setOtpData] = useState({} as any);

    const loadSecret = async () => {
        setLoading(true);
        const { success, message, data } = await otpSecret();
        setLoading(false);
        if(success) {
            setOtpData(data);
        }else{
            msg.error(message);
        }
    }

    useEffect(() => {
        loadSecret().then();
    }, []);

    return <FormItem name={"qrcode"} label={t("身份验证 App 密钥")}>
        <OtpInfo loading={loading} secret={otpData.secret} qrcode={otpData.qrcode} />
    </FormItem>
};

export default SecretItem;
