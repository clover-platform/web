import {useCallback, useRef, useState} from "react";
import entries from 'lodash/entries';
import keys from 'lodash/keys';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useMessage} from "@clover/core";
import {RestResult} from "@clover/common/utils/rest.interface";

export interface TableLoaderOptions {
    initialParams: any;
    action: (data: any) => Promise<RestResult<any>>;
    withURL?: boolean;
    encodeParams?: string[];
    scroll?: boolean;
}

const reqInit = {
    page: 1,
    size: 20
};

export const useUrlQuery = () => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const query: any = {};
    for (let key of params.keys() as any) {
        query[key] = params.get(key) || '';
    }
    return query;
}

const standardRestParams = (params = {}) =>
    entries(params).reduce((prev, next) => {
        const [key, value] = next;
        let v = value;
        if (v === 'null') {
            v = null
        } else if (v === 'undefined') {
            v = ''
        } else if (v === 'false' || v === 'true') {
            v = v === 'true'
        }
        (prev as any)[key] = v;
        return prev;
    }, {});

export const useTableLoader = (options: TableLoaderOptions) => {
    const {
        initialParams = {},
        withURL = true,
        encodeParams = [],
        action,
    } = options;

    const msg = useMessage();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const legalKeys = useRef(keys(Object.assign((cloneDeep(initialParams) || {}), reqInit)));
    const router = useRouter();
    let path = usePathname()
    const urlParam = useUrlQuery();
    const finalUrlParam = withURL ? urlParam : {};
    const req = useRef(Object.assign((cloneDeep(initialParams) || {}), reqInit, finalUrlParam));
    const onLoad = useCallback(async (params: any) => {
        try {
            setLoading(true);
            if (!params) {
                params = req.current;
            } else {
                params = { ...req.current, ...params };
                req.current = { ...params };
            }
            if (withURL) {
                let searchParams = params;
                if(urlParam) {
                    searchParams = { ...urlParam, ...params };
                }
                const queryString = new URLSearchParams(searchParams).toString();
                history.replaceState(queryString, "", `${path}?${queryString}`);   //暂时先解决next.js13硬重载问题，后期有其他方式再替换
                //router.replace(`${path}?${queryString}`)
                //router.replace(`${path}?${queryString}`, null, { scroll })
            }
            const data: any = standardRestParams(pick(params, legalKeys.current));
            encodeParams.forEach((key) => data[key] = encodeURIComponent(data[key]));
            console.table(data);
            const { success, data: res, message } = await action(data);
            if (success) {
                // const { data = [], total } = res || {};
                // if (!data.length && total !== 0) {
                //     return onLoad({
                //         ...params,
                //         page: Math.ceil(total / params.size)
                //     });
                // }
                setResult(res);
            } else {
                msg.error(message || "{#网络错误#}")
            }
        } catch (error: any) {
            msg.error(error.message || "{#网络错误#}")
        } finally {
            setLoading(false);
        }
    }, [action, withURL, scroll, urlParam]);

    const reset = useCallback(() => {
        setLoading(true);
        setResult(null)
    }, []);

    return [loading, result, req.current, onLoad, reset];
}
