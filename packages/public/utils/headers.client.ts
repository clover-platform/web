import { getLangCode, isMobile } from "@easykit/common/utils";
import Bowser from 'bowser';
import { getToken } from "@clover/public/utils/token";

export const get = () => {
    const browser = Bowser.parse(window.navigator.userAgent);
    const acceptLanguage = getLangCode();
    const headers: any = {
        "Accept-Language": acceptLanguage,
        'CLIENT-PLATFORM-TYPE': isMobile() ? 'H5': 'PC',
        "CLIENT-BUNDLE-ID": location.hostname,
        "CLIENT-DEVICE-MODEL":browser.os.name,
        "CLIENT-SYSTEM-VERSION": browser.os.version,
        "CLIENT-TIMESTAMP": Date.now()
    }
    if(getToken()) headers['Authorization'] = "Bearer " + getToken()?.token;
    return headers;
}
