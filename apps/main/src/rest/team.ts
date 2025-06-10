
import type { Team } from '@clover/public/types/team'
import { get } from '@clover/public/utils/rest'

export const myCollect = () => get<Team[]>('@main/team/collect/my')