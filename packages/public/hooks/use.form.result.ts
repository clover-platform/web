import { type RefObject, useCallback } from 'react'
import { useMessage } from '@easykit/design'
import type { UseFormReturn } from 'react-hook-form'
import type { RestResult } from '@clover/public/types/rest'

export type ErrorItem = {
  field: string
  message: string
  code: string
}

export type UseFormResultProps<T> = {
  ref?: RefObject<UseFormReturn | undefined | null>
  onSuccess?: (result?: T) => void
}

export type FormResult<T> = (d: RestResult<T>) => RestResult<T>

export const useFormResult = <T>(props: UseFormResultProps<T>) => {
  const { ref, onSuccess } = props
  const msg = useMessage()
  return useCallback<FormResult<T>>(
    (d: RestResult<T>): RestResult<T> => {
      const { success, code, data, message } = d
      if (success) {
        onSuccess?.(data)
      } else if (code === 400) {
        const errors = data as ErrorItem[]
        if (errors) {
          for (const { field, message } of errors) {
            ref?.current?.setError(field, { message })
          }
        }
      } else {
        msg.error(message)
      }
      return d
    },
    [ref, onSuccess, msg]
  )
}
