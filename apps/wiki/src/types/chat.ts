import dayjs from "dayjs";

export type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
    status: "sending" | "sent" | "failed";
    time: number|string|Date|dayjs.Dayjs;
    request?: string;
}
