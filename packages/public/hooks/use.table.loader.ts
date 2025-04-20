import {useCallback, useMemo, useRef, useState} from "react";
import { cloneDeep, pick } from "es-toolkit";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useMessage} from "@easykit/design";
import {RestResult, CancellablePromise} from "@clover/public/types/rest";
import {t} from '@clover/public/locale';

export interface TableLoaderOptions {
  initialParams: any;
  action: (data: any) => CancellablePromise<RestResult<any>>;
  withURL?: boolean;
  encodeParams?: string[];
  keys?: string[];
}

const reqInit = {
  page: 1,
  size: 10
};

export const useUrlQuery = () => {
  const searchParams = useSearchParams()
  return useMemo(() => {
    const params = new URLSearchParams(searchParams)
    const query: any = {};
    for (const key of params.keys()) {
      query[key] = params.get(key) || '';
    }
    return query;
  }, [searchParams]);
}

const standardRestParams = (params = {}) =>
  Object.entries(params).reduce((prev: any, next) => {
    const [key, value] = next;
    let v = value;
    if (v === 'null') {
      v = null
    } else if (v === 'undefined') {
      v = ''
    } else if (v === 'false' || v === 'true') {
      v = v === 'true'
    }
    prev[key] = v;
    return prev;
  }, {});

export const useTableLoader = <D>(options: TableLoaderOptions) => {
  const {
    initialParams,
    withURL = true,
    action,
    encodeParams,
    keys: keysOptions,
  } = options;

  const msg = useMessage();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<RestResult<{
    total: number;
    data: D[];
  }> | null>(null);
  const legalKeys = useRef([
    ...Object.keys(Object.assign((cloneDeep(initialParams) || {}), reqInit)),
    ...(keysOptions||[])
  ]);
  const encodeParamsRef = useRef(encodeParams);
  const router = useRouter();
  const path = usePathname()
  const urlParamRef = useRef(useUrlQuery());
  const finalUrlParam = withURL ? urlParamRef.current : {};
  const req = useRef(Object.assign((cloneDeep(initialParams) || {}), reqInit, finalUrlParam));

  const onLoad = useCallback(async (params: any) => {
    try {
      setLoading(true);
      if (!params) {
        params = req.current;
      } else {
        params = {...req.current, ...params};
        req.current = {...params};
      }
      if (withURL) {
        const queryString = new URLSearchParams(params).toString();
        router.replace(`${path}?${queryString}`)
      }
      const data: any = standardRestParams(pick(params, legalKeys.current));
      encodeParamsRef.current?.forEach((key) => data[key] = encodeURIComponent(data[key]));
      console.table(data);
      const {success, data: res, message} = await action(data);
      if (success) {
        setResult(res);
      } else {
        msg.error(message || t("网络错误"))
      }
    } catch (error: any) {
      msg.error(error.message || t("网络错误"))
    } finally {
      setLoading(false);
    }
  }, [withURL, encodeParamsRef, action, router, path, msg]);

  const reset = useCallback(() => {
    setLoading(true);
    setResult(null)
  }, []);

  return [loading, result, req.current, onLoad, reset];
}
