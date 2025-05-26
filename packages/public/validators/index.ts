import { t } from '@clover/public/utils/locale.client'
import { isPassword } from '../utils/account'
import { EMAIL, USERNAME } from '../utils/regular'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const email = (value: any, callback: (msg?: string) => void) => {
  if (!value) return callback()
  if (!EMAIL.test(value)) {
    return callback(t('邮箱格式不正确'))
  }
  callback()
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const username = (value: any, callback: (msg?: string) => void) => {
  if (!value) return callback()
  if (!USERNAME.test(value)) {
    return callback(t('字母数字或下划线，字母开头'))
  }
  callback()
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const samePassword = (value: any, callback: (msg?: string) => void, target: any) => {
  if (!value) return callback()
  if (value !== target) {
    return callback(t('两次密码输入不一致'))
  }
  callback()
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const setPassword = (value: any, callback: (msg?: string) => void) => {
  if (!value) return callback()
  if (!isPassword(value)) {
    return callback(t('6-18位密码，包含大小写、特殊符号、数字'))
  }
  callback()
}
