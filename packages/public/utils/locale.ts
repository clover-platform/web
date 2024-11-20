import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {FALLBACK} from "@clover/public/config/locale";

export const getLocale = async () => {
    const locale = await getCookie('locale', {cookies});
    return locale || FALLBACK;
}
