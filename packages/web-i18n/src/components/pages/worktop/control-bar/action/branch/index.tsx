import { Action } from "@clover/public/components/common/action";
import { FC } from "react";
import { IconBranch } from "@arco-iconbox/react-clover";
import { useRecoilValue } from "recoil";
import { branchesState, currentBranchState } from "@/state/worktop";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type BranchActionProps = {
    onClick: () => void;
};

export const BranchAction: FC<BranchActionProps> = (props) => {
    const branches = useRecoilValue(branchesState);
    const current = useRecoilValue(currentBranchState);
    const branch = branches.find(item => item.name === current);
    return <Action className={"!px-1.5 h-8"} onClick={props.onClick}>
        <IconBranch {...FIX_ICON_PROPS} className={"mr-1"} /> { branch ? branch.name : "{#请选择分支#}" }
    </Action>
}
