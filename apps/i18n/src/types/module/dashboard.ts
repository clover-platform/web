import type { LanguageWithCount } from '../public'
import type { ModuleCount, ModuleDetail } from '.'
import type { Member } from './member'

export type ModuleDashboard = {
  detail: ModuleDetail
  languages: LanguageWithCount[]
  members: Member[]
  count: ModuleCount
}
