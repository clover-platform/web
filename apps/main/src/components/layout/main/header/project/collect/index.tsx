import {Empty} from "@easykit/design";
import {CollectLoadingItem} from "@/components/layout/main/header/collect-loading";
import {useCollectProject} from "@/hooks/use.collect.project";
import {CollectProjectItem} from "@/components/layout/main/header/project/collect/item";
import { useTranslation } from "react-i18next";

export const ProjectCollect = () => {
  const { loading, collect } = useCollectProject();
  const { t } = useTranslation();
  return <div>
    {
      loading ? [0, 1, 2].map((k) => <CollectLoadingItem key={k} />) :
        (
          collect?.length ? collect.map((project) => <CollectProjectItem key={project.id} project={project}/>) :
            <Empty text={t("你关注的项目在此处显示")}/>
        )
    }
  </div>
}
