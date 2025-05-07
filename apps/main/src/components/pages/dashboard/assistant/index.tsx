import {Action, Card, Input} from "@easykit/design";
import {IconQA, IconSend, IconWiki} from "@arco-iconbox/react-clover";
import {ReactNode} from "react";
import { useTranslation } from 'react-i18next';
import {t} from "@clover/public/utils/locale.client";

type Suggestion = {
  title: string;
  description: string;
  icon: ReactNode;
}

const getSuggestion = (): Suggestion[] => [
  {
    title: t("知识库"),
    description: t("请确认用户需求变动记录"),
    icon: <IconWiki />
  },
  {
    title: t("Agent"),
    description: t("请创建一条权限数据，并分配给管理员。"),
    icon: <IconQA />
  },
]

export const Assistant = () => {
  const { t } = useTranslation();
  return <Card>
    <div className={"space-y-md"}>
      <div className={"relative"}>
        <Input placeholder={t("你好，需要什么帮助吗？")} className={"h-10"} />
        <div className={"absolute top-0 bottom-0 right-0 p-[5px]"}>
          <Action className={"!p-1.5"}>
            <IconSend />
          </Action>
        </div>
      </div>
      <div className={"flex flex-wrap"}>
        {
          getSuggestion().map((item) => {
            return <div key={item.title} className={"flex justify-center items-center rounded-full border mr-2xs mb-2xs cursor-pointer text-sm"}>
              <div className={"px-2 py-1 bg-secondary text-secondary-foreground rounded-l-full border-r flex justify-center items-center space-x-1"}>
                {item.icon}
                <span>{item.title}</span>
              </div>
              <div className={"px-2 py-1 text-secondary-foreground/60"}>{item.description}</div>
            </div>
          })
        }
      </div>
    </div>
  </Card>
}
