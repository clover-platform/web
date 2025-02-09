import Axios, {AxiosHeaders, AxiosResponse} from 'axios';
import type { AxiosRequestConfig } from 'axios';
const CancelToken = Axios.CancelToken;

export type RestResult<T> = {
  success?: boolean;
  code?: number;
  message?: string;
  data?: T;
}

export type CancellablePromise<T> = Promise<T> & { cancel: () => void };

export type RestConfig = {
    useTransId?: boolean;
    onResponse?: (data: RestResult<any>, response: AxiosResponse) => void;
}

let _config: RestConfig = {};
const instance = Axios.create({
    timeout: 30000,
    headers: {
        post: {
            "Content-Type": "application/json;charset=UTF-8",
        },
    },
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL || "",
});
let aliasMap: Record<string, any> = {};

instance.interceptors.response.use(
    (response) => {
        const { config } = response;
        if(config && config.responseType && config.responseType === 'blob' && response.data.type !== 'application/json') {
            const file = new Blob([response.data], { type: response.headers['content-type'] || "application/vnd.ms-excel" });
            const url = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = url;
            a.download = (config as any).fileName;
            a.click();
        }
        return response;
    }
);

const handleResponse = (data: RestResult<any>, response: AxiosResponse) => {
    const { onResponse } = _config;
    if (typeof onResponse === 'function') {
        onResponse(data, response);
    }
    return data;
}

const handleUrl = (url?: string) => {
    if(!url) return url;
    Object.keys(aliasMap).forEach((key) => {
        const config = aliasMap[key];
        url = url?.replace(key, config.url);
    });
    return url;
};

const handleHeaders = (headers?: AxiosHeaders) => {
    const result = {
        ...(headers || {}),
        timezone: - (new Date().getTimezoneOffset() / 60)
    };
    const aliasHeaders = {};
    Object.keys(aliasMap).forEach((key) => {
        const config = aliasMap[key];
        const { headers } = config;
        if (typeof headers === 'function') {
            Object.assign(aliasHeaders, headers() || {});
        } else {
            Object.assign(aliasHeaders, headers || {});
        }
    });
    Object.assign(aliasHeaders, result);
    return aliasHeaders;
};

export function request<T>(config: AxiosRequestConfig): CancellablePromise<RestResult<T>> {
    const { url, headers, ...rest } = config;
    const source = CancelToken.source();
    const promise = new Promise<RestResult<T>>((resolve) => {
        instance.request<RestResult<T>>({
            ...rest,
            url: handleUrl(url),
            headers: handleHeaders(headers as AxiosHeaders),
            cancelToken: source.token,
        }).then((response) => {
            resolve(handleResponse(response.data, response));
        }).catch((error) => {
            resolve({
                code: error?.status || 500,
                message: error?.message || 'Network Error',
                success: false,
            })
        });
    }) as CancellablePromise<RestResult<T>>;
    promise.cancel = () => {
        source.cancel('Operation canceled by the user.');
    };
    return promise;
}

export function get<T, P = undefined>(url: string, params?: P, config?: AxiosRequestConfig): CancellablePromise<RestResult<T>> {
    return request({
        ...config,
        url,
        method: 'get',
        params,
    });
}

export function post<T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig): CancellablePromise<RestResult<T>> {
    return request({
        ...config,
        url,
        method: 'post',
        data,
    });
}

export function put<T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig): CancellablePromise<RestResult<T>> {
    return request({
        ...config,
        url,
        method: 'put',
        data,
    });
}

export function del<T, D = undefined>(url: string, data?: D, config?: AxiosRequestConfig): CancellablePromise<RestResult<T>> {
    return request({
        ...config,
        url,
        method: 'delete',
        data,
    });
}

export function download<T, P = undefined>(url: string, params?: P, config?: AxiosRequestConfig): CancellablePromise<RestResult<T>> {
    return request({
        ...config,
        url,
        method: 'get',
        params,
        responseType: 'blob',
        timeout: 0,
    });
}

export const alias = (map: Record<string, any>) => {
    aliasMap = map;
};

export const config = (config: RestConfig) => {
    _config = config;
}
