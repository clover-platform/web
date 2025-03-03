import {useAtomValue} from "jotai";
import {projectsState} from "@clover/public/state/public";
import {ProjectItem} from "@clover/public/components/layout/main/header/project-switcher/list/item";

export const ProjectList = () => {
  const projects = useAtomValue(projectsState);
  return <div>
    { projects.map((project) => <ProjectItem key={project.id} project={project}/>) }
  </div>
}
