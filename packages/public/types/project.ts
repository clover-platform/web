import type { User } from '@clover/public/types/account'
import type { Team } from '@clover/public/types/team'

export type Project = {
  id: number
  name: string
  ownerId: number
  createTime: Date
  teamId: number
  projectKey: string
  cover?: string
  owner: User
  team: Team
  isCollect?: boolean
  memberType: number
  lastActivityTime?: Date
}
