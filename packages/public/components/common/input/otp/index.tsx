
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@easykit/design'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import type { FC } from 'react'

export type OTPInputProps = {
  value?: string
  onChange?: (value: string) => void
}

export const OTPInput: FC<OTPInputProps> = (props) => {
  const { value, onChange } = props

  return (
    <InputOTP value={value} onChange={onChange} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot className="h-12 w-12 text-xl" index={0} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={1} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={2} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={3} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={4} />
        <InputOTPSlot className="h-12 w-12 text-xl" index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}