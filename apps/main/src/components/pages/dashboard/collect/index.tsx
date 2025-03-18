import {tt} from "@clover/public/locale";
import {Card, Empty, Tabs, TabsContent, TabsList, TabsTrigger} from "@easykit/design";

export const Collect = () => {
  return <Card title={tt("关注")}>
    <Tabs defaultValue="team">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="team">{tt("团队")}</TabsTrigger>
        <TabsTrigger value="project">{tt("项目")}</TabsTrigger>
      </TabsList>
      <TabsContent value="team">
        <Empty text={tt("暂无关注团队")} />
      </TabsContent>
      <TabsContent value="project">
        <Empty text={tt("暂无关注项目")} />
      </TabsContent>
    </Tabs>
  </Card>
}
