import Axios, {AxiosRequestConfig} from 'axios';
const CancelToken = Axios.CancelToken;
const isDev = process.env.NODE_ENV !== 'production';
const ERROR_MESSAGE = "{#网络错误#}";
const ERROR_CODE = -999;

export type RestConfig = {
    useTransId?: boolean;
    onResponse?: (data: any, response: any) => void;
}
export type RestRequestConfig = AxiosRequestConfig & {
    fileName?: string;
    trailingSlash?: boolean;
    needLogin?: boolean;
}

export type AbortPromise<T> = Promise<T> & {
    _url: string;
    abort: () => void;
}

let _aliasMap: any = {};
let _config: RestConfig = {};
let _currentQueueId = `${Date.now()}`;
const _requestQueue: Record<string, AbortPromise<any>[]> = {};

_requestQueue[_currentQueueId] = [];

const rest = Axios.create({
    timeout: 30000,
    headers: {
        post: {
            "Content-Type": "application/json;charset=UTF-8",
        },
    },
    withCredentials: true,
});

rest.interceptors.response.use(
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

// 响应拦截器
rest.interceptors.response.use(
    (response) => {
        const { onResponse } = _config;
        let data = {
            code: response.status,
            success: false,
            message: ERROR_MESSAGE,
        };
        if ([200, 201].includes(response.status)) {
            data = response.data;
        }
        if (typeof onResponse === 'function') {
            onResponse(data, response);
        }
        return data as any;
    },
    (error) => {
        const { onResponse } = _config;
        let result = {
            code: 500,
            success: false,
            message: error.code,
        };
        if (error.response && error.response.status) {
            result.code = error.response.status;
            if(error.response.data) {
                result = error.response.data;
            }
        }
        if (typeof onResponse === 'function') {
            onResponse(result, error.response);
        }
        return Promise.reject(result);
    },
);

// 请求拦截器
rest.interceptors.request.use(
    (config) => {
        if(!isDev) {
            return config;
        }
        // next.js trailingSlash 开启以后，会要求url以 / 结尾
        const { url } = config;
        if(url?.includes('?')) {
            const urls = url.split('?');
            let base = urls[0];
            const query = urls[1];
            if(base.lastIndexOf('/') !== base.length - 1) {
                base = base + '/';
            }
            config.url = base + '?' + query;
        }else {
            if(url?.lastIndexOf('/') !== (url ||'').length - 1) {
                config.url = url + '/';
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const _handleUrl = (url: string) => {
    Object.keys(_aliasMap).forEach((key) => {
        const config = _aliasMap[key];
        url = url.replace(key, config.url);
    });
    return url;
};

const _handleHeaders = (headers: any) => {
    const result = {
        ...(headers || {}),
        timezone: - (new Date().getTimezoneOffset() / 60)
    };
    const aliasHeaders = {};
    Object.keys(_aliasMap).forEach((key) => {
        const config = _aliasMap[key];
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

const alias = (map: any) => {
    // 合并 map 到 _aliasMap
    _aliasMap = {
        ..._aliasMap,
        ...(map || {}),
    };
};

const config = (config: RestConfig) => {
    _config = config;
};

const pushQueue = (requestPromise: any) => {
    _requestQueue[_currentQueueId].push(requestPromise);
}

function request<T> (config: RestRequestConfig): AbortPromise<T> {
    const { url, headers } = config;
    const source = CancelToken.source();
    const p = new Promise<T>((resolve) => {
        if(url) {
            rest({
                ...config,
                url: _handleUrl(url),
                headers: _handleHeaders(headers),
                cancelToken: source.token
            }).then((res) => {
                resolve(res as any);
            }).catch((err) => {
                resolve(err);
            });
        }else{
            const result = {
                code: ERROR_CODE,
                success: false,
                message: ERROR_MESSAGE
            };
            resolve(result as any);
        }
    }) as AbortPromise<T>;
    p._url = url!;
    p.abort = source.cancel;
    pushQueue(p);
    return p;
}

function get<T> (url: string, params?: any, config?: RestRequestConfig): AbortPromise<T> {
    return request<T>({
        ...config,
        url,
        method: 'get',
        params
    });
}

function post<T> (url: string, params?: any, config?: RestRequestConfig): AbortPromise<T> {
    return request<T>({
        ...config,
        url,
        method: 'post',
        data: params || {}
    });
}

function put<T> (url: string, params?: any, config?: RestRequestConfig): AbortPromise<T> {
    return request<T>({
        ...config,
        url,
        method: 'put',
        data: params || {}
    });
};

function del<T> (url: string, params?: any, config?: RestRequestConfig): AbortPromise<T> {
    return request<T>({
        ...config,
        url,
        method: 'delete',
        data: params || {}
    });
};
const download = (url: string, params?: any, fileName?: string) => {
    return get(url, params, { responseType: 'blob', fileName, trailingSlash: false, timeout: 0 })
}

const setCurrentQueueId = (id: string) => {
    _currentQueueId = id;
    _requestQueue[id] = [];
}
const abortByQueueId = (id: string) => {
    _requestQueue[id].forEach((p: any) => {
        p.abort();
    })
}

export {
    get,
    config,
    alias,
    post,
    put,
    del,
    request,
    download,
    setCurrentQueueId,
    abortByQueueId
};
