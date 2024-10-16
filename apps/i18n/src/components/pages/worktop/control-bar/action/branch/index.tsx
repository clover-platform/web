import { Action } from "@clover/public/components/common/action";
import { FC } from "react";
import { IconBranch } from "@arco-iconbox/react-clover";
import { useRecoilValue } from "recoil";
import { branchesState, currentBranchState } from "@/state/worktop";
import { t } from '@easykit/common/utils/locale';

export type BranchActionProps = {
    onClick: () => void;
};

export const BranchAction: FC<BranchActionProps> = (props) => {
    const branches = useRecoilValue(branchesState);
    const current = useRecoilValue(currentBranchState);
    const branch = branches.find(item => item.name === current);
    return <Action className={"!px-1.5 h-8"} onClick={props.onClick}>
        <IconBranch className={"mr-1"} /> { branch ? branch.name : t("请选择分支") }
    </Action>
}
