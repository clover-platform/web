import { type QueryObserverResult, type RefetchOptions, keepPreviousData, useQuery } from '@tanstack/react-query'
import { isEqual } from 'es-toolkit'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PageData } from '../types/rest'

export type ListQueryOptions<T, P> = {
  key: string
  params?: P
  withURL?: boolean
  encodeParams?: string[]
  action: (params: P) => Promise<PageData<T> | T[] | undefined>
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
  page: 1,
  size: 10,
}

export const useListQuery = <T, P extends Record<string, unknown> = Record<string, unknown>>(
  options: ListQueryOptions<T, P>
): ListQueryResult<T> => {
  const { params, key, action, encodeParams, withURL = true } = options
  const [loadParams, setLoadParams] = useState<Record<string, unknown> | undefined>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // 解析 URL 参数
  const urlParams = useMemo(() => {
    if (!withURL) return {}
    const paramsObj: Record<string, unknown> = {}
    if (searchParams) {
      for (const key of searchParams.keys()) {
        paramsObj[key] = searchParams.get(key) || ''
      }
    }
    return paramsObj
  }, [searchParams, withURL])

  // 合并参数，优先级：defaultParams < urlParams < params < loadParams
  const queryKeyParams = useMemo(() => {
    const all = {
      ...defaultParams,
      ...(withURL ? urlParams : {}),
      ...(params || {}),
      ...(loadParams || {}),
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
    // 当前 URL 参数
    const currentParams: Record<string, string> = {}
    if (searchParams) {
      for (const key of searchParams.keys()) {
        currentParams[key] = searchParams.get(key) || ''
      }
    }
    // 目标参数
    const targetParams: Record<string, string> = {}
    for (const [k, v] of Object.entries(queryKeyParams)) {
      targetParams[k] = v == null ? '' : String(v)
    }
    // 只有不一致时才 replace
    if (!isEqual(currentParams, targetParams)) {
      const queryString = new URLSearchParams(targetParams).toString()
      router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`)
    }
  }, [queryKeyParams, withURL, router, pathname, searchParams])

  const queryKey = useMemo(() => {
    return [key, queryKeyParams]
  }, [key, queryKeyParams])

  const { isLoading, data, refetch } = useQuery({
    queryKey,
    queryFn: ({ queryKey }) => action(queryKey[1] as unknown as P),
    placeholderData: keepPreviousData,
  })

  const load = useCallback((params?: unknown) => {
    setLoadParams((prev) => ({
      ...(prev || {}),
      ...(params || {}),
    }))
  }, [])

  const pagination = useMemo<ListQueryPagination>(() => {
    return {
      total: Array.isArray(data) ? data.length : data?.total || 0,
      page: (queryKeyParams?.page as number) || 1,
      size: (queryKeyParams?.size as number) || 10,
    }
  }, [data, queryKeyParams])

  return {
    loading: isLoading,
    load,
    data: Array.isArray(data) ? data : data?.data || [],
    pagination,
    refetch,
    query: queryKeyParams,
  }
}