import {Card, Empty, Tabs, TabsContent, TabsList, TabsTrigger} from "@easykit/design";
import { useTranslation } from 'react-i18next';

export const Collect = () => {
  const { t } = useTranslation();
  
  return <Card title={t("关注")}>
    <Tabs defaultValue="team">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="team">{t("团队")}</TabsTrigger>
        <TabsTrigger value="project">{t("项目")}</TabsTrigger>
      </TabsList>
      <TabsContent value="team">
        <Empty text={t("暂无关注团队")} />
      </TabsContent>
      <TabsContent value="project">
        <Empty text={t("暂无关注项目")} />
      </TabsContent>
    </Tabs>
  </Card>
}
