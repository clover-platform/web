import {Switcher} from "@clover/public/components/layout/main/navbar/switcher";
import {useRecoilValue} from "recoil";
import {projectsState} from "@clover/public/state/public";
import {useCurrent} from "@clover/public/components/layout/hooks/main";

export const ProjectsSwitcher = () => {
    const projects = useRecoilValue(projectsState);
    const { projectId } = useCurrent();

    return <Switcher
        value={projectId}
        title={t("项目")}
        description={t("你加入或者参与的项目")}
        subtitle={t("切换项目")}
        newButtonLabel={t("创建项目")}
        newUrl={"/{#LANG#}/project/new/"}
        listUrl={"/{#LANG#}/project/"}
        items={projects.map(({id, name}) => ({value: id, label: name}))}
    />
}
