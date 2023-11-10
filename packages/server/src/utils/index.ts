import {EMAIL, URL} from "@/utils/regular";

export const isEmail = (text: string) => {
    return EMAIL.test(text);
}

export const isUrl = (text: string) => {
    return URL.test(text);
}
