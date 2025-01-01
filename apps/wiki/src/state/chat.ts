import {atom} from "jotai/index";
import {Message} from "@/types/chat";

export const messagesState = atom<Message[]>([])
