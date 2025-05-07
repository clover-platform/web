import {Card, Empty} from "@easykit/design";
import { useTranslation } from 'react-i18next';

export const Activity = () => {
  const { t } = useTranslation();
  return <Card title={t("动态")}>
    <Empty text={t("暂无动态")} />
  </Card>
}
