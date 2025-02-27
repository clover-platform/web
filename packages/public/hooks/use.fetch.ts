import {useCallback, useState} from "react";
import {useMessage} from "@easykit/design";
import {CancellablePromise, RestResult} from "@clover/public/types/rest";

export const useFetch = <T, P = void>(api: (params?: P) => CancellablePromise<RestResult<T>>, options?: {
  showMessage: boolean
}) => {
  const {showMessage = false} = options || {};

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<T|undefined|null>(null);
  const msg = useMessage();

  const load = useCallback(async (params?: P) => {
    setLoading(true);
    const {success, data, message} = await api(params);
    if (success) {
      setResult(data);
    } else {
      if(showMessage) {
        msg.error(message);
      }
    }
    setLoading(false);
  }, [api, msg, showMessage])

  return {
    loading,
    result,
    load
  }
}
