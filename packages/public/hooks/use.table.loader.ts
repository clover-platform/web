import type { RestResult } from '@clover/public/types/rest'
import { useMessage } from '@easykit/design'
import { cloneDeep, pick } from 'es-toolkit'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
export interface TableLoaderOptions {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  initialParams: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  action: (data: any) => Promise<RestResult<any>>
  withURL?: boolean
  encodeParams?: string[]
  keys?: string[]
}

const reqInit = {
  page: 1,
  size: 10,
}

export const useUrlQuery = () => {
  const searchParams = useSearchParams()
  return useMemo(() => {
    const params = new URLSearchParams(searchParams)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const query: any = {}
    for (const key of params.keys()) {
      query[key] = params.get(key) || ''
    }
    return query
  }, [searchParams])
}

const standardRestParams = (params = {}) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  Object.entries(params).reduce((prev: any, next) => {
    const [key, value] = next
    let v = value
    if (v === 'null') {
      v = null
    } else if (v === 'undefined') {
      v = ''
    } else if (v === 'false' || v === 'true') {
      v = v === 'true'
    }
    prev[key] = v
    return prev
  }, {})

export const useTableLoader = <D>(options: TableLoaderOptions) => {
  const { initialParams, withURL = true, action, encodeParams, keys: keysOptions } = options

  const msg = useMessage()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<RestResult<{
    total: number
    data: D[]
  }> | null>(null)
  const legalKeys = useRef([
    ...Object.keys(Object.assign(cloneDeep(initialParams) || {}, reqInit)),
    ...(keysOptions || []),
  ])
  const encodeParamsRef = useRef(encodeParams)
  const router = useRouter()
  const path = usePathname()
  const urlParamRef = useRef(useUrlQuery())
  const finalUrlParam = withURL ? urlParamRef.current : {}
  const req = useRef(Object.assign(cloneDeep(initialParams) || {}, reqInit, finalUrlParam))

  const onLoad = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    async (params: any) => {
      try {
        setLoading(true)
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let mergedParams: Record<string, any>
        if (params) {
          mergedParams = { ...req.current, ...params }
          req.current = { ...mergedParams }
        } else {
          mergedParams = req.current
        }
        if (withURL) {
          const queryString = new URLSearchParams(mergedParams).toString()
          router.replace(`${path}?${queryString}`)
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const data: any = standardRestParams(pick(mergedParams, legalKeys.current))
        if (encodeParamsRef.current) {
          for (const key of encodeParamsRef.current) {
            data[key] = encodeURIComponent(data[key])
          }
        }
        console.table(data)
        const { success, data: res, message } = await action(data)
        if (success) {
          setResult(res)
        } else {
          msg.error(message || t('网络错误'))
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        msg.error(error.message || t('网络错误'))
      } finally {
        setLoading(false)
      }
    },
    [withURL, action, router, path, msg, t]
  )

  const reset = useCallback(() => {
    setLoading(true)
    setResult(null)
  }, [])

  return [loading, result, req.current, onLoad, reset]
}
