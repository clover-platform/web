import {Switcher} from "@clover/public/components/layout/main-v1/navbar/switcher";
import {useAtom} from "jotai";
import {teamsState} from "@clover/public/state/public";
import {useCurrent} from "@clover/public/components/layout/hooks/main";
import { t } from '@clover/public/locale';

export const TeamsSwitcher = () => {
    const [teams] = useAtom(teamsState);
    const { teamId } = useCurrent();

    return <Switcher
        value={teamId}
        title={t("团队")}
        description={t("你加入或者创建的团队")}
        subtitle={t("切换团队")}
        newButtonLabel={t("创建团队")}
        newUrl={`/team/new`}
        listUrl={`/team`}
        items={teams.map(({id, name}) => ({value: id, label: name}))}
    />
}
