import { EMAIL } from "./regular";

export const isEmail = (text: string) => {
    return EMAIL.test(text);
}
