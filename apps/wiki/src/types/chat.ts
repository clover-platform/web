import dayjs from "dayjs";

export type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
    time: number|string|Date|dayjs.Dayjs;
    request?: string;
}
