import {IconNotice, IconShare} from "@arco-iconbox/react-clover";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
  Action, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Empty
} from "@easykit/design";
import {useState} from "react";
import {tt} from "@clover/public/locale";

export const Notice = () => {
  const [open, setOpen] = useState(false);

  return <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
      <Action className={"!outline-none"} active={open}>
        <IconNotice />
      </Action>
    </DropdownMenuTrigger>
    <DropdownMenuContent align={"end"} className={"p-4 w-[540px] space-y-3"}>
      <div className={"flex justify-center items-center"}>
        <div className={"text-xl font-bold"}>{tt("通知")}</div>
        <div className={"flex-1 flex justify-end"}>
          <Action>
            <IconShare />
          </Action>
        </div>
      </div>
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">{tt("全部")}</TabsTrigger>
          <TabsTrigger value="follow">{tt("已关注")}</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Empty text={tt("暂无通知")} />
        </TabsContent>
        <TabsContent value="follow">
          <Empty text={tt("暂无通知")} />
        </TabsContent>
      </Tabs>
    </DropdownMenuContent>
  </DropdownMenu>
}
