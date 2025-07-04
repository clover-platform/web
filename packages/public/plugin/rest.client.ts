import bus from '@clover/public/events';
import {UNAUTHORIZED} from "@clover/public/events/auth";
import type { RestResult } from '@clover/public/types/rest'
import {get} from "@clover/public/utils/headers.client";
// Rest 配置
import { alias, config } from '@clover/public/utils/rest'
import type { AxiosResponse } from 'axios'

config({
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onResponse: (data: RestResult<any>, response: AxiosResponse) => {
    const { url } = response.config
    const { code } = data
    if (code === 401 && !url?.includes('main/account/profile')) {
      bus.emit(UNAUTHORIZED)
    }
  },
})

// 别名配置
alias({
  '@main': {
    url: '/api/main',
    headers: get
  },
  '@assets': {
    url: '/api/assets',
    headers: get
  },
  '@account': {
    url: '/api/account',
    headers: get
  },
});
