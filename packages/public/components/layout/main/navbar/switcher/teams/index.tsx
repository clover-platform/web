import {Switcher} from "@clover/public/components/layout/main/navbar/switcher";
import {useRecoilValue} from "recoil";
import {teamsState} from "@clover/public/state/public";
import {useCurrent} from "@clover/public/components/layout/hooks/main";
import { t } from '@easykit/common/utils/locale';
import {useLocaleCode} from "@easykit/common/hooks";

export const TeamsSwitcher = () => {
    const teams = useRecoilValue(teamsState);
    const { teamId } = useCurrent();
    const locale = useLocaleCode();

    return <Switcher
        value={teamId}
        title={t("团队")}
        description={t("你加入或者创建的团队")}
        subtitle={t("切换团队")}
        newButtonLabel={t("创建团队")}
        newUrl={`/${locale}/team/new/`}
        listUrl={`/${locale}/team/`}
        items={teams.map(({id, name}) => ({value: id, label: name}))}
    />
}
