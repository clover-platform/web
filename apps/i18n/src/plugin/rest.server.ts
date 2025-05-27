import { get } from '@clover/public/utils/headers.server'
// 别名配置
import { alias } from '@clover/public/utils/rest'

alias({
  '@i18n': {
    url: '/api/i18n',
    headers: get,
  },
})
