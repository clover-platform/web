import {cookies} from "next/headers";
import { getToken } from "@clover/public/utils/token";
import i18next from "i18next";

export const get = () => {
    const headers: any = {
        "Accept-Language": i18next.language,
        'CLIENT-PLATFORM-TYPE': 'SSR',
        "CLIENT-BUNDLE-ID": "",
        "CLIENT-DEVICE-MODEL": "",
        "CLIENT-SYSTEM-VERSION": "",
        "CLIENT-TIMESTAMP": Date.now()
    }
    const token = getToken(cookies)?.token;
    if(token) headers['Authorization'] = "Bearer " + token;
    return headers;
}
