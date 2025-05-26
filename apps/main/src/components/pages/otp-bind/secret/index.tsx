import {OtpInfo} from "@/components/common/account/otp-info";
import { otpSecret } from '@/rest/auth'
import { FormItem, useMessage } from '@easykit/design'
import { type FC, type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";

export type SecretItemProps = PropsWithChildren;

const SecretItem: FC<SecretItemProps> = () => {
  const msg = useMessage();
  const [loading, setLoading] = useState(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [otpData, setOtpData] = useState({} as any)
  const { t } = useTranslation();

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

  return (
    <FormItem name="qrcode" label={t('身份验证 App 密钥')}>
      <OtpInfo loading={loading} secret={otpData.secret} qrcode={otpData.qrcode} />
    </FormItem>
  )
};

export default SecretItem;
