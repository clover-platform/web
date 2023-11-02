import {getLangCode, isMobile} from "@clover/common/utils";
import packageInfo from '../../package.json';
import Bowser from 'bowser';

export const get = () => {
    const browser = Bowser.parse(window.navigator.userAgent);
    const acceptLanguage = getLangCode();
    const headers = {
        "Accept-Language": acceptLanguage === "zh-CN" ? 'zh-TW' : acceptLanguage,
        'CLIENT-PLATFORM-TYPE': isMobile() ? 'H5': 'PC',
        "CLIENT-BUNDLE-ID": location.hostname,
        "CLIENT-VERSION": packageInfo.version,
        "CLIENT-DEVICE-MODEL":browser.os.name,
        // "CLIENT-DEVICE-ID": getDeviceId(),
        "CLIENT-SYSTEM-VERSION": browser.os.version,
        "CLIENT-TIMESTAMP": Date.now()
    }
    // if(getToken()) headers['Authorization'] = "Bearer " + getToken();
    return headers;
}
