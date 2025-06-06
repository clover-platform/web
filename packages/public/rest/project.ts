import {get} from "@clover/public/utils/rest";
import type { Project } from '../types/project'

export const my = async () => get<Project[]>('@main/project/my')
