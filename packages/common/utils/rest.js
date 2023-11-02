import Axios from 'axios';
const CancelToken = Axios.CancelToken;

const ERROR_MESSAGE = "{#网络错误#}";
const ERROR_CODE = -999;

let _aliasMap = {};
let _config = {};
let _currentQueueId = `${Date.now()}`;
const _requestQueue = {};

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
            a.download = config.fileName;
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
        if (response.status === 200) {
            data = response.data;
        }
        if (typeof onResponse === 'function') {
            onResponse(data, response);
        }
        return data;
    },
    (error) => {
        const { onResponse } = _config;
        const result = {
            code: error.code,
            success: false,
            message: ERROR_MESSAGE,
        };
        if (error.response && error.response.status) {
            result.code = error.response.status;
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
        // next.js trailingSlash 开启以后，会要求url以 / 结尾
        const { url } = config;
        if(url.includes('?')) {
            const urls = url.split('?');
            let base = urls[0];
            const query = urls[1];
            if(base.lastIndexOf('/') !== base.length - 1) {
                base = base + '/';
            }
            config.url = base + '?' + query;
        }else {
            if(url.lastIndexOf('/') !== url.length - 1) {
                config.url = url + '/';
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const _handleUrl = (url) => {
    Object.keys(_aliasMap).forEach((key) => {
        const config = _aliasMap[key];
        url = url.replace(key, config.url);
    });
    return url;
};

const _handleHeaders = (headers) => {
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

const alias = (map) => {
    _aliasMap = map;
};

const config = (config) => {
    _config = config;
};

const pushQueue = (requestPromise) => {
    _requestQueue[_currentQueueId].push(requestPromise);
}

const request = (config) => {
    const { url, headers } = config;
    const source = CancelToken.source();
    const p = new Promise((resolve) => {
        if(url) {
            rest({
                ...config,
                url: _handleUrl(url),
                headers: _handleHeaders(headers),
                cancelToken: source.token
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                resolve(err);
            });
        }else{
            const result = {
                code: ERROR_CODE,
                success: false,
                message: ERROR_MESSAGE
            };
            resolve(result);
        }
    });
    p._url = url;
    p.abort = () => {
        source.cancel('Operation canceled by the user.');
    };
    pushQueue(p);
    return p;
};

const get = (url, params, config) => {
    return request({
        ...config,
        url,
        method: 'get',
        params
    });
};

const post = (url, params, config) => {
    return request({
        ...config,
        url,
        method: 'post',
        data: params || {}
    });
};

const put = (url, params, config) => {
    return request({
        ...config,
        url,
        method: 'put',
        data: params || {}
    });
};

const del = (url, params, config) => {
    return request({
        ...config,
        url,
        method: 'delete',
        data: params || {}
    });
};
const setCurrentQueueId = (id) => {
    _currentQueueId = id;
    _requestQueue[id] = [];
}
const abortByQueueId = (id) => {
    console.log('abortByQueueId',id, _requestQueue);
    _requestQueue[id].forEach((p) => {
        console.log(p);
        p.abort();
    })
}
const download = (url, params, fileName) => {
    return get(url, params, { responseType: 'blob', fileName, trailingSlash: false, timeout: 0 })
}
export {
    get,
    config,
    alias,
    post,
    put,
    del,
    request,
    setCurrentQueueId,
    abortByQueueId,
    download
};
