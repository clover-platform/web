import type { Language } from '@/types/pages/public'
import { get } from "@clover/public/utils/rest";

export const languages = () => get<Language[], undefined>('@i18n/language/list')
