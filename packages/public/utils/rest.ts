import type { CancellablePromise, RestConfig, RestResult } from '@clover/public/types/rest'
import Axios, { type AxiosHeaders, type AxiosResponse } from 'axios'
import type { AxiosRequestConfig } from 'axios'

const CancelToken = Axios.CancelToken

let _config: RestConfig = {}
const instance = Axios.create({
  timeout: 30000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
})
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let aliasMap: Record<string, any> = {}

instance.interceptors.response.use((response) => {
  const { config } = response
  if (config && config.responseType === 'blob' && response.data.type !== 'application/json') {
    const file = new Blob([response.data], { type: response.headers['content-type'] || 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    a.download = (config as any).fileName
    a.click()
  }
  return response
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const handleResponse = (data: RestResult<any>, response: AxiosResponse) => {
  const { onResponse } = _config
  if (typeof onResponse === 'function') {
    onResponse(data, response)
  }
  return data
}

const handleUrl = (url?: string) => {
  if (!url) return url
  let result = url
  for (const key of Object.keys(aliasMap)) {
    const config = aliasMap[key]
    result = result?.replace(key, config.url)
  }
  return result
}

const handleHeaders = async (url: string, headers?: AxiosHeaders) => {
  const result = {
    ...(headers || {}),
    timezone: -(new Date().getTimezoneOffset() / 60),
  }
  const aliasHeaders = {}
  for (const key of Object.keys(aliasMap)) {
    if (url.startsWith(key)) {
      const config = aliasMap[key]
      const { headers } = config
      if (typeof headers === 'function') {
        Object.assign(aliasHeaders, (await headers()) || {})
      } else {
        Object.assign(aliasHeaders, headers || {})
      }
      return Object.assign(aliasHeaders, result)
    }
  }
  return result
}

export function request<T>(config: AxiosRequestConfig): CancellablePromise<RestResult<T>> {
  const { url, headers, ...rest } = config
  const source = CancelToken.source()
  const promise = new Promise<RestResult<T>>((resolve, reject) => {
    handleHeaders(url as string, headers as AxiosHeaders).then((headers) => {
      const _url = handleUrl(url) || ''
      if (_url.startsWith('@')) {
        // 没有处理别名的不请求
        reject(new RestError('Network Error', 500))
        return
      }
      instance
        .request<RestResult<T>>({
          ...rest,
          url: _url,
          headers,
          cancelToken: source.token,
        })
        .then((response) => {
          resolve(handleResponse(response.data, response))
        })
        .catch((error) => {
          reject(new RestError(error?.message || 'Network Error', error?.status || 500, error?.data))
        })
    })
  }) as CancellablePromise<RestResult<T>>
  promise.cancel = () => {
    source.cancel('Operation canceled by the user.')
  }
  return promise
}

export function get<T, P = undefined>(
  url: string,
  params?: P,
  config?: AxiosRequestConfig
): CancellablePromise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: 'get',
    params,
  })
}

export function post<T, D = undefined>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): CancellablePromise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: 'post',
    data,
  })
}

export function put<T, D = undefined>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): CancellablePromise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: 'put',
    data,
  })
}

export function del<T, D = undefined>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): CancellablePromise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: 'delete',
    data,
  })
}

export function download<T, P = undefined>(
  url: string,
  params?: P,
  config?: AxiosRequestConfig
): CancellablePromise<RestResult<T>> {
  return request({
    ...config,
    url,
    method: 'get',
    params,
    responseType: 'blob',
    timeout: 0,
  })
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const alias = (map: Record<string, any>) => {
  aliasMap = {
    ...aliasMap,
    ...map,
  }
}

export const config = (config: RestConfig) => {
  _config = config
}

export class RestError extends Error {
  code?: number
  data?: unknown
  constructor(message: string, code?: number, data?: unknown) {
    super(message)
    this.name = 'RestError'
    this.code = code
    this.data = data
  }
}
