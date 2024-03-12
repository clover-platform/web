import {Switcher} from "@clover/public/components/layout/main/navbar/switcher";
import {useRecoilValue} from "recoil";
import {teamsState} from "@clover/public/state/public";

export const ProjectsSwitcher = () => {
    const teams = useRecoilValue(teamsState);
    return <Switcher
        title={"{#项目#}"}
        description={"{#你加入或者参与的项目#}"}
        subtitle={"{#切换项目#}"}
        newButtonLabel={"{#创建项目#}"}
        newUrl={"/{#LANG#}/project/new/"}
        listUrl={"/{#LANG#}/project/"}
        items={teams.map(({id, name}) => ({value: id, label: name}))}
    />
}
