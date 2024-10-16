import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import QRCode from 'qrcode';
import { isValidElement } from 'react';
import { EMAIL, URL as URL_REG } from "./regular";

const langList = [
    {
        key: 'zh-cn',
        value: '简体中文',
        code: 'zh-CN',
    },
    {
        key: 'zh-tw',
        value: '繁體中文',
        code: 'zh-TW',
    },
    {
        key: 'en-us',
        value: 'English',
        code: 'en-US',
    }
];

const isServer = typeof window === 'undefined';

export const isEmail = (text: string) => {
    return EMAIL.test(text);
}

export const isUrl = (text: string) => {
    return URL_REG.test(text);
}

// 容错'0'
export const failover = (v: string) => {
    if(v === '0') return '';
    return v;
}

export const getLangCode = () => {
    const lang = t("LANG");
    const item = langList.find(({key}) => (key === lang))
    if(item) return item.code;
    return 'zh-CN';
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

export const startWithLang = (path: string) => {
    for(let i = 0 ; i < langList.length; i ++) {
        const lang = langList[i];
        if(path.startsWith(`/${lang.key}`)) {
            return true;
        }
    }
    return false;
}

function uuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function loadScript(id: string, url: string) {
    return new Promise(resolve => {
        let script = document.getElementById(id) as any;
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
            script.onreadystatechange = function(event: any) {
                script.loaded = true;
                if(this.readyState === "loaded" || this.readyState === "complete"){
                    originEvent && originEvent(event);
                    console.log('script', id, 'ready');
                    resolve(id);
                }
            };
        }else{
            let originEvent = script.onload;
            script.onload = function (event: any){
                script.loaded = true;
                originEvent && originEvent(event);
                console.log('script', id, 'onload');
                resolve(id);
            };
        }
    });
}

function loadStyle(id: string, url: string) {
    return new Promise(resolve => {
        let link = document.getElementById(id) as any;
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
        link.onload = function (event: any){
            originEvent && originEvent(event);
            console.log('loadStyle', id, 'onload');
            link.loaded = true;
            resolve(id);
        };
    });
}

export {
    uuid,
    isServer,
    isMobile,
    loadScript,
    loadStyle,
    isIOS,
    isAndroid,
    isWeChat
}
