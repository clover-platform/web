import {MutableRefObject, useCallback} from "react";
import {UseFormReturn} from "react-hook-form";
import {RestResult} from "@easykit/common/types/rest";
import {useMessage} from "@easykit/design";

export type ErrorItem = {
    field: string;
    message: string;
    code: string;
}

export type UseFormResultProps = {
    ref: MutableRefObject<UseFormReturn|undefined>;
    onSuccess?: () => void;
}

export const useFormResult = function <T>(props: UseFormResultProps) {
    const {ref, onSuccess} = props;
    const msg = useMessage();
    return useCallback((d: RestResult<T>): RestResult<T> => {
        const { success, code, data, message } = d;
        if(success) {
            onSuccess?.();
        }else{
            if(code === 400) {
                const errors = data as ErrorItem[];
                errors?.forEach(({field, message}) => {
                    ref.current?.setError(field, { message });
                });
            }else{
                msg.error(message);
            }
        }
        return d;
    }, [ref, onSuccess, msg])
}
