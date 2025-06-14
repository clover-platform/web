import type { Language } from '@/types/public'
import { get } from "@clover/public/utils/rest";

export const languages = () => get<Language[], undefined>('@i18n/language/list')
