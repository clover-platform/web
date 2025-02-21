import {useState} from "react";
import {useMessage} from "@easykit/design";

export const useFetch = (api: (params: any) => Promise<any>, options?: {
  showMessage: boolean
}) => {
  const {showMessage = false} = options || {};

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const msg = useMessage();

  const load = async (params?: any) => {
    setLoading(true);
    const {success, data, message} = await api(params);
    if (success) {
      setResult(data);
    } else {
      showMessage && msg.error(message);
    }
    setLoading(false);
  }

  return {
    loading,
    result,
    load
  }
}
