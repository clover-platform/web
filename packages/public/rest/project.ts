import type { Project } from '../types/project'

import { get } from '@clover/public/utils/rest'

export const my = async () => get<Project[]>('@main/project/my')
