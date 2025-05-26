import { type UseFormResultProps, useFormResult } from '@clover/public/hooks/use.form.result'
import type { CancellablePromise, RestResult } from '@clover/public/types/rest'
import { type RefObject, useCallback, useRef, useState } from 'react'
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

export type UseFormSubmitProps<T, P> = UseFormResultProps<T> & {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  action: ((data: P) => CancellablePromise<RestResult<any>>) | ((data?: P) => CancellablePromise<RestResult<any>>)
}

export const useFormSubmit = <T, P = void>(
  props: UseFormSubmitProps<T, P>
): { ref: RefObject<UseFormReturn | null>; submitting: boolean; onSubmit: SubmitHandler<FieldValues> } => {
  const { action, ...rest } = props
  const ref = useRef<UseFormReturn>(null)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const formResult = useFormResult<any>({
    ...rest,
    ref,
  })
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = useCallback(
    async (data: P) => {
      setSubmitting(true)
      formResult(await action(data))
      setSubmitting(false)
    },
    [action, formResult]
  )

  return { ref, submitting, onSubmit: onSubmit as SubmitHandler<FieldValues> }
}
