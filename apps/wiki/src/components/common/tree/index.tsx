import RCTree, { TreeProps as RCTreeProps, BasicDataNode } from "rc-tree";
import "rc-tree/assets/index.css";
import {FC, ReactNode} from "react";

export type TreeData = {
    key: string;
    title: ReactNode;
    children: TreeData[];
} & BasicDataNode;

export type TreeProps = RCTreeProps<TreeData> & {
    prefixCls?: string;
};

export const Tree: FC<TreeProps> = (props) => {
    return <RCTree<TreeData> {...props}/>
}
