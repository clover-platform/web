import { get } from '@clover/public/utils/rest'
import type { Language } from '@/types/public'

export const languages = () => get<Language[], undefined>('@i18n/language/list')
