import {atom} from "jotai";
import {AppsItemProps} from "@clover/public/rest/config";

export const loadingState = atom<boolean>(true);

export const appsState = atom<AppsItemProps[]>([]);
