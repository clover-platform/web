import { atom } from "jotai";
import { Language } from "@/types/pages/public";

export const languagesState = atom<Language[]>([])
