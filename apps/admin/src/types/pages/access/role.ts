import {AuthorityTreeNode} from "@/types/pages/access/authority";

export type AccessRole = {
    id: number;
    name: string;
    description: string;
    enable: boolean;
    authorities: string[];
    authorityTree: AuthorityTreeNode[];
}
