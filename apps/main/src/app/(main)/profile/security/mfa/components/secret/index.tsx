import { OtpInfo } from '@/components/common/account/otp-info'
import { FormItem } from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { otpSecret } from '../rest'

export type SecretItemProps = PropsWithChildren

const SecretItem: FC<SecretItemProps> = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['profile:mfa:otp:secret'],
    queryFn: otpSecret,
  })

  return (
    <FormItem name="qrcode" label={t('身份验证 App 密钥')}>
      <OtpInfo loading={isLoading} secret={data?.secret} qrcode={data?.qrcode} />
    </FormItem>
  )
}

export default SecretItem
