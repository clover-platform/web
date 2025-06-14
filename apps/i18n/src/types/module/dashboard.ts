import type { Member, ModuleCount, ModuleDetail } from '.'
import type { LanguageWithCount } from '../public'

export type ModuleDashboard = {
  detail: ModuleDetail
  languages: LanguageWithCount[]
  members: Member[]
  count: ModuleCount
}