import type { RestResult } from '../types/rest'

import { useMemo } from 'react'

export type UseResultDataOptions<T> = {
  data?: RestResult<T>
  isError: boolean
  isLoading: boolean
}

export const useResultData = <T>(options: UseResultDataOptions<T>) => {
  const { data, isError, isLoading } = options
  return useMemo(() => {
    if (isError) {
      return undefined
    }
    if (isLoading) {
      return undefined
    }
    const { success, data: result } = data ?? { success: false }
    return success ? result : undefined
  }, [data, isError, isLoading])
}
