import {useFormResult, UseFormResultProps} from "@clover/public/hooks/use.form.result";
import {RefObject, useCallback, useRef, useState} from "react";
import {CancellablePromise, RestResult} from "@clover/public/types/rest";
import {FieldValues, SubmitHandler, UseFormReturn} from "react-hook-form";

export type UseFormSubmitProps<T, P> = UseFormResultProps<T> & {
  action: ((data: P) => CancellablePromise<RestResult<any>>) | ((data?: P) => CancellablePromise<RestResult<any>>);
};

export const useFormSubmit = <T, P = void>(props: UseFormSubmitProps<T, P>):
  {ref: RefObject<UseFormReturn | null>, submitting: boolean, onSubmit: SubmitHandler<FieldValues>} => {
  const {
    action,
    ...rest
  } = props;
  const ref = useRef<UseFormReturn>(null);
  const formResult = useFormResult<any>({
    ...rest,
    ref,
  });
  const [submitting, setSubmitting] = useState(false);


  const onSubmit = useCallback(async (data: P) => {
    setSubmitting(true);
    formResult(await action(data));
    setSubmitting(false);
  }, [action, formResult])

  return {ref, submitting, onSubmit: onSubmit as SubmitHandler<FieldValues>};
}
