import type { Project } from '@clover/public/types/project'
import { get } from '@clover/public/utils/rest'

export const myCollect = () => get<Project[]>('@main/project/collect/my')