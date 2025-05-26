import type { User } from '@clover/public/types/account'
import type { Team } from '@clover/public/types/team'

export type Project = {
  id: number
  name: string
  projectKey: string
  ownerId: number
  createTime: Date
  teamId: number
  cover?: string
  owner: User
  team: Team
  isCollect?: boolean
  memberType: number
}
