import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import QRCode from 'qrcode';
import { isValidElement } from 'react';
import { EMAIL, URL as URL_REG } from "./regular.js";

// TODO 语言列表
const langList = [];

const isServer = typeof window === 'undefined';

export const isEmail = (text) => {
    return EMAIL.test(text);
}

export const isUrl = (text) => {
    return URL_REG.test(text);
}

// 容错'0'
export const failover = (v) => {
    if(v === '0') return '';
    return v;
}

export const getLangCode = () => {
    const lang = "{#LANG#}";
    const item = langList.find(({key}) => (key === lang))
    if(item) return item.apiKey;
    const langArray = lang.split('-');
    return `${langArray[0]}-${langArray[1].toUpperCase()}`
}

function isMobile(){
    if(isServer) return false;
    return !!window.navigator.userAgent.match(/(Metalpha|Antalpha|phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

function isIOS(){
    if(isServer) return false;
    return !!window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i);
}

function isAndroid(){
    if(isServer) return false;
    return !!window.navigator.userAgent.match(/(Android)/i);
}

function isWeChat(){
    if(isServer) return false;
    return !!window.navigator.userAgent.match(/(micromessenger|wxwork)/i);
}

export const startWithLang = (path) => {
    for(let i = 0 ; i < langList.length; i ++) {
        const lang = langList[i];
        if(path.startsWith(`/${lang.key}`)) {
            return true;
        }
    }
    return false;
}

const getLang = (list = langList, fallback = ['en-us', 'zh-cn']) => {
    if(isServer) return getConfig(CONFIG_KEY.DEFAULT_LANG);
    const langInLocal = localStorage.getItem(getConfig(CONFIG_KEY.LANG_KEY));
    if(langInLocal) {
        const l = list.find(({key}) => (key === langInLocal));
        if(l) return langInLocal;
    }
    let lang = localStorage.lang; const nl = navigator.language.toLowerCase(); let sl = ''; const ll = fallback;
    if (!lang) {
        for (let i = 0; i < ll.length; i++) {
            if (!sl) {
                sl = nl.substr(0, 2) === ll[i].substr(0, 2) ? ll[i] : '';
            }
            if (!lang) {
                lang = ll[i] === nl ? nl : '';
            }
        }
        lang = lang || sl || getConfig(CONFIG_KEY.DEFAULT_LANG);
    }
    return lang;
}

function uuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function loadScript(id, url) {
    return new Promise(resolve => {
        let script = document.getElementById(id);
        if(!script) {
            script = document.createElement('script');
            script.id = id;
            script.type = 'text/javascript';
            script.src = url;
            document.body.appendChild(script);
        }
        if(script.loaded){
            resolve(id);
            return;
        }
        if(script.readyState){
            let originEvent = script.onreadystatechange;
            script.onreadystatechange = function(event) {
                script.loaded = true;
                if(this.readyState === "loaded" || this.readyState === "complete"){
                    originEvent && originEvent(event);
                    console.log('script', id, 'ready');
                    resolve(id);
                }
            };
        }else{
            let originEvent = script.onload;
            script.onload = function (event){
                script.loaded = true;
                originEvent && originEvent(event);
                console.log('script', id, 'onload');
                resolve(id);
            };
        }
    });
}

function loadStyle(id, url) {
    return new Promise(resolve => {
        let link = document.getElementById(id);
        if(!link) {
            link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
        }
        if(link.loaded){
            resolve(id);
            return;
        }
        let originEvent = link.onload;
        link.onload = function (event){
            originEvent && originEvent(event);
            console.log('loadStyle', id, 'onload');
            link.loaded = true;
            resolve(id);
        };
    });
}

/**
 *  @param m 例如
 *  ['user', [['userName', 'userNameLike'], ['data', 'fuzzy']]],
    ['brandObj', [['brandsName', 'brandsNameLike'], ['data', 'fuzzy']]],
    ['time', [['startCreatedTime', 'endCreatedTime'], ['start', 'end']]],
    ['status', [Number, Number]],
    ['channelId', [Number, Number]],
*/
const parseParams = m => {
    if(!m) return [e => e, e => e];
    const map = new Map(m);
    // keys = ['user', 'brandObj', 'time', 'status', 'channelId']
    const keys = [...map.keys()];
    /**
     *
     * values = [
     *
     *       **** URL查询参数的Key值和表单值的Key值一致 ****
     *      [['userName', 'userNameLike'], ['data', 'fuzzy']],
     *      [['brandsName', 'brandsNameLike'], ['data', 'fuzzy']],
     *      [['startCreatedTime', 'endCreatedTime'], ['start', 'end']],
     *
     *       **** 需要对URL查询参数值和表单值做特殊处理 ****
     *      [Number, Number],
     *      [Number, Number]
     *  ]
    */
    const values = [...map.values()];
    // 此方法把url查询参数转换成表单值
    const parseToForm = p => {
        /**
         *  {
         *      "userId":"",
         *      "userName":"",
         *      "requestId":"",
         *      "currency":"",
         *      "subStatus":"",
         *      "userNameLike":"false",
         *      "brandsName":"",
         *      "brandsNameLike":"false",
         *      "startCreatedTime":"",
         *      "endCreatedTime":"",
         *      "type":"2",
         *      "channelId":"",
         *      "network":"",
         *      "id":"",
         *      "page":"1",
         *      "size":"20",
         *      "tab":"withdraw"
         *  }
         * */
        const params = cloneDeep(p);
        // 储存处理过的值
        let ret = {};
        // 储存处理过的key（针对表单key和url查询参数key不一致的情况）
        const usedKeys = [];
        values.forEach((v, i) => {
            /**
             * uk、fk 二者 必须同为 数据（长度相同）或者函数
             * */
            const [uk, fk] = v;
            // 当同为函数时; 注：此处可优化，如果uk为函数，直接使用uk方法的返回值，不用判断其他情况
            if(typeof uk === 'function') {
                // 拿到当前配置所属参数的参数值
                let pv = params[keys[i]];
                // 处理值的特殊情况
                if(pv === 'false' || pv === 'true') {
                    pv = pv === 'true'
                } else if(
                    pv === '' ||
                    pv === 'null' ||
                    pv === null ||
                    pv === 'undefined' ||
                    pv === undefined
                ){
                    pv = ''
                } else {
                    // 只有非特殊情况才会执行uk处理值
                    pv = uk(pv);
                }
                ret[keys[i]] = pv;
            } else {
                /**
                 * 此时uk为数组，fk为数组；这里主要针对表单key和接口参数key不一致的情况（之所以是数组是因为有复合表单项会抛出多个值）
                 *
                 * 如 ['user', [['userName', 'userNameLike'], ['data', 'fuzzy']]]
                 *  user 是表单的key（field）; user 这个表单项的值会抛出一个对象 user = { data: 'xxx', fuzzy: bool }
                 *  但，URL查询参数（接口参数）需要的是单独的 key-value
                 *  且，URL查询参数的key和表单的key不一致
                 *  此分支会把 url查询参数的 { ..., userName: 'xxx', userNameLike: bool } 转换成 { ..., user: { data: 'xxx', fuzzy: bool }
                 *
                 * */
                ret[keys[i]] = fk.reduce((prev, next, index) => {
                    usedKeys.push(uk[index]);
                    let pv = params[uk[index]];
                    if(pv === 'false' || pv === 'true') {
                        pv = pv === 'true'
                    } else if (
                        pv === '' ||
                        pv === 'null' ||
                        pv === null ||
                        pv === 'undefined' ||
                        pv === undefined
                    ) {
                        pv = ''
                    }
                    prev[next] = pv !== undefined ? pv : null;
                    return prev;
                }, {});
            }
        });
        /**
         * 在m中没有相关配置的参数会直接抛出，
         * 由于存在表单项和接口参数key不一致的情况，
         * 所以需要把已经被转换的参数剔除，
         * usedKeys就是干这个是的
         * */
        ret = { ...omit(params, usedKeys), ...ret };
        return ret;
    };
    // 此方法把表单值转换成接口参数（接口参数会在useTableLoader中转化成URL查询参数）
    const parseToRest = p => {
        const params = cloneDeep(p);
        let ret = {};
        let usedKeys = [];
        /**
         * 这里只会特殊处理，不会处理表单key和URL查询参数key不一致的情况
         *
         * 至于 uk 为函数的情况，因为最后都映射成字符串了，所以没做处理，可优化
         *
         * */
        keys.forEach((k, i) => {
            const [uk, fk] = values[i];
            if(typeof uk !== 'function') {
                usedKeys.push(k)
                const fv = params[k] || {};
                fk.forEach((f, index )=> {
                    ret[uk[index]] = fv[f];
                });
            }
        });
        ret = { ...omit(params, usedKeys), ...ret };
        return ret;
    };
    return [parseToForm, parseToRest];
};

const getPopupContainer = node => {
    return node.parentElement;
}

const optionsCreator = (options = [], format = {}) => {
    if(!options.length) return [[], {}];
    const { value = 'value', label = 'label' } = format;
    return [
        [
            {
                label: "{#全部#}",
                value: ''
            },
            ...options
                .map(e => ({
                    value: e[value],
                    label: e[label],
                    ...omit(e, [value, label])
                }))
        ],
        options
            .reduce((prev, next) => {
                prev[next[value]] = {
                    ...next,
                    value: next[value],
                    label: next[label],
                };
                return prev;
            }, {})
    ]
}

export const indexByName = (list, name, value) => {
    const item = list.find((i) => (i[name] === value));
    if(!item) return -1;
    return list.indexOf(item);
}

const generateQR = async (text, configs = {}) => {
    try {
        const url = await QRCode.toDataURL(text, configs);
        return url
    } catch (err) {
        return null;
    }
}

export const enumsOptionsCreator = (data, config) => {

    const ret = new Array(2).fill(null);
    if (!data) return ret;

    const {
        labelKey = 'label',
        valueKey = 'value',
        valueFormat = e => e?.toString()
    } = config || {};

    const _data = cloneDeep(data);
    const keys = Object.keys(_data);
    ret[0] = {};

    let index = 0;
    ret[1] = [
        ...{
            ...data,
            [Symbol.iterator]: () => {
                return {
                    next: () => {
                        if (!keys.length) return { done: true };
                        const key = keys.shift();
                        let originalValue = _data[key][valueKey];
                        let value = originalValue;
                        if (originalValue === undefined || originalValue === null) {
                            value = ++index
                            ret[0][key] = value;
                        } else if(typeof originalValue === 'string'){
                            value = originalValue;
                            ret[0][key] = originalValue;
                            index++;
                        } else {
                            value = originalValue;
                            index = Math.max(index, originalValue);
                            ret[0][key] = originalValue;
                        }
                        ret[0][value] = {
                            ..._data[key],
                            [valueKey]: value,
                            enum: key
                        };
                        return { value: { ..._data[key], value: valueFormat(value), label: _data[key][labelKey] }, done: false };
                    }
                }
            }
        }
    ]
    return ret;
};

const isReactNode = (node) =>
    (
        isValidElement(node) ||
        node === null ||
        typeof node === 'boolean' ||
        typeof node === 'number' ||
        typeof node === 'string'
    )


export const maskOfEmail = (v) => {
    if (!v) return v;
    let arr = v.split('@');
    return arr[0]?.slice(0, 1) + '****' + (arr.length > 1 ? '@' + arr[1] : '');
}

export const downLoadFile = (url,text,callback) => {
    const x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.responseType = 'blob';
    x.onload = function (e) {
        const url = window.URL.createObjectURL(x.response);
        callback && callback();
        const a = document.createElement('a');
        a.href = url;
        a.download = text;
        a.click();
    };
    x.send();

}

export const getFileType =(filePath)=>{
    let dotIdx= filePath.lastIndexOf(".");
    let suffix = filePath.substr(dotIdx+1);
    return suffix.toLowerCase()
}

export {
    uuid,
    isServer,
    isMobile,
    loadScript,
    loadStyle,
    getLang,
    parseParams,
    getPopupContainer,
    optionsCreator,
    isIOS,
    isAndroid,
    generateQR,
    isWeChat,
    isReactNode,
}
