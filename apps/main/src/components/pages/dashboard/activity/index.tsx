import {tt} from "@clover/public/locale";
import {Card, Empty} from "@easykit/design";

export const Activity = () => {
  return <Card title={tt("动态")}>
    <Empty text={tt("暂无动态")} />
  </Card>
}
