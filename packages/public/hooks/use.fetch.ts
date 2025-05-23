import {useCallback, useState} from "react";
import {useMessage} from "@easykit/design";
import {CancellablePromise, RestResult} from "@clover/public/types/rest";

export const useFetch = <T, P = any>(api: (params?: P) => CancellablePromise<RestResult<T>>, options?: {
  showMessage?: boolean,
  initLoading?: boolean
}) => {
  const {
    initLoading = false,
    showMessage = false
  } = options || {};

  const [loading, setLoading] = useState(initLoading);
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
    return data;
  }, [api, msg, showMessage])

  return {
    loading,
    result,
    load
  }
}
