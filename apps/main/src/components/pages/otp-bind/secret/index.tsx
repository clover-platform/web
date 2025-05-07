import {FormItem, useMessage} from "@easykit/design";
import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {otpSecret} from "@/rest/auth";
import {OtpInfo} from "@/components/common/account/otp-info";
import {t} from '@clover/public/utils/i18next';

export type SecretItemProps = PropsWithChildren;

const SecretItem: FC<SecretItemProps> = () => {
  const msg = useMessage();
  const [loading, setLoading] = useState(false);
  const [otpData, setOtpData] = useState({} as any);

  const loadSecret = useCallback(async () => {
    setLoading(true);
    const {success, message, data} = await otpSecret();
    setLoading(false);
    if (success) {
      setOtpData(data);
    } else {
      msg.error(message);
    }
  }, [msg])

  useEffect(() => {
    loadSecret().then();
  }, [loadSecret]);

  return <FormItem name={"qrcode"} label={t("身份验证 App 密钥")}>
    <OtpInfo loading={loading} secret={otpData.secret} qrcode={otpData.qrcode}/>
  </FormItem>
};

export default SecretItem;
