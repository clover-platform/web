import { type QueryObserverResult, type RefetchOptions, keepPreviousData, useQuery } from '@tanstack/react-query'
import { uniq } from 'es-toolkit'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PageData } from '../types/rest'

export type ListQueryOptions<T, P> = {
  key: string
  params?: P
  withURL?: boolean
  encodeParams?: string[]
  action: (params: P) => Promise<PageData<T> | T[] | undefined>
  queryKeys?: string[]
  initialParams?: Record<string, unknown>
}

export type ListQueryPagination = {
  total: number
  page: number
  size: number
}

export type ListQueryResult<T> = {
  loading: boolean
  data: T[]
  load: (params?: unknown) => Promise<unknown> | unknown
  pagination: ListQueryPagination
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<PageData<T> | T[] | undefined, Error>>
  query: Record<string, unknown>
}

const defaultParams = {
  page: '1',
  size: '10',
}

const STRING_KEYS = ['page', 'size']

export const useListQuery = <T, P extends Record<string, unknown> = Record<string, unknown>>(
  options: ListQueryOptions<T, P>
): ListQueryResult<T> => {
  const { params, key, action, encodeParams, withURL = true, queryKeys: qks, initialParams } = options
  const [loadParams, setLoadParams] = useState<Record<string, unknown> | undefined>()
  const [forceRefresh, setForceRefresh] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const lastUrlParamsRef = useRef<string>('')

  const queryKeys = useMemo(() => {
    return uniq([...(qks || []), ...Object.keys(initialParams || {}), ...Object.keys(defaultParams)])
  }, [qks, initialParams])

  // 解析 URL 参数
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  const urlParams = useMemo(() => {
    if (!withURL) return {}
    const paramsObj: Record<string, unknown> = {}
    if (searchParams) {
      // 如果设置了 queryKeys，只解析白名单中的参数
      if (queryKeys && queryKeys.length > 0) {
        for (const key of queryKeys) {
          const value = searchParams.get(key)
          if (value !== null) {
            paramsObj[key] = value
          }
        }
      } else {
        // 如果没有设置 queryKeys，解析所有参数
        for (const key of searchParams.keys()) {
          paramsObj[key] = searchParams.get(key) || ''
        }
      }
    }
    return paramsObj
  }, [searchParams, withURL, queryKeys])

  // 合并参数，优先级：defaultParams < urlParams < params < loadParams
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  const queryKeyParams = useMemo(() => {
    const all = {
      ...defaultParams,
      ...(withURL ? urlParams : {}),
      ...(params || {}),
      ...(loadParams || {}),
    }
    for (const key of STRING_KEYS) {
      const value = (all as Record<string, unknown>)[key]
      if (typeof value === 'number') {
        ;(all as Record<string, unknown>)[key] = String(value)
      }
    }
    if (encodeParams) {
      for (const key of encodeParams) {
        const value = (all as Record<string, unknown>)[key]
        if (typeof value === 'string') {
          ;(all as Record<string, unknown>)[key] = encodeURIComponent(value)
        }
      }
    }
    return all
  }, [params, encodeParams, loadParams, urlParams, withURL])

  // queryKeyParams 变化时同步到 URL（避免死循环）
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  useEffect(() => {
    if (!withURL) return

    // 获取当前URL中的所有参数
    const currentAllParams: Record<string, string> = {}
    if (searchParams) {
      for (const key of searchParams.keys()) {
        currentAllParams[key] = searchParams.get(key) || ''
      }
    }

    // 计算这个hook管理的参数
    const managedParams: Record<string, string> = {}
    const managedKeys = queryKeys && queryKeys.length > 0 ? queryKeys : Object.keys(queryKeyParams)

    for (const [k, v] of Object.entries(queryKeyParams)) {
      if (managedKeys.includes(k)) {
        managedParams[k] = v == null ? '' : String(v)
      }
    }

    // 保留不受此hook管理的其他参数
    const otherParams: Record<string, string> = {}
    for (const [key, value] of Object.entries(currentAllParams)) {
      if (!managedKeys.includes(key)) {
        otherParams[key] = value
      }
    }

    // 合并其他参数和管理的参数
    const finalParams = { ...otherParams, ...managedParams }
    const newQueryString = new URLSearchParams(finalParams).toString()

    // 比较当前URL参数和目标参数，如果相同则不更新
    const currentUrlParams = searchParams?.toString() || ''
    if (currentUrlParams === newQueryString) {
      return
    }

    // 防止参数来回震荡
    if (lastUrlParamsRef.current === newQueryString) {
      return
    }

    lastUrlParamsRef.current = newQueryString
    router.replace(`${pathname}${newQueryString ? `?${newQueryString}` : ''}`)
  }, [queryKeyParams, withURL, router, pathname, searchParams, queryKeys])

  const queryKey = useMemo(() => {
    return [key, queryKeyParams, forceRefresh]
  }, [key, queryKeyParams, forceRefresh])

  const { isLoading, isFetching, data, refetch } = useQuery({
    queryKey,
    queryFn: ({ queryKey }) => action(queryKey[1] as unknown as P),
    placeholderData: keepPreviousData,
  })

  const load = useCallback((params?: unknown) => {
    setLoadParams((prev) => ({
      ...(prev || {}),
      ...(params || {}),
    }))
    // 强制刷新，确保即使参数相同也会重新请求
    setForceRefresh((prev) => prev + 1)
  }, [])

  const pagination = useMemo<ListQueryPagination>(() => {
    return {
      total: Array.isArray(data) ? data.length : data?.total || 0,
      page: Number(queryKeyParams?.page) || 1,
      size: Number(queryKeyParams?.size) || 10,
    }
  }, [data, queryKeyParams])

  return {
    loading: isLoading || isFetching,
    load,
    data: Array.isArray(data) ? data : data?.data || [],
    pagination,
    refetch,
    query: queryKeyParams,
  }
}
