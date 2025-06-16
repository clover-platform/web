import type { AuthorityTreeNode } from '@/types/module/access/authority'

export type AccessRole = {
    id: number;
    name: string;
    description: string;
    enable: boolean;
    authorities: string[];
    authorityTree: AuthorityTreeNode[];
}
