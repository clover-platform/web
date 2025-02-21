import {tt} from "@clover/public/locale";
import {Button, Input, Separator} from "@easykit/design";
import {IconX, IconGithubCircle} from "@arco-iconbox/react-clover";
import {LayoutLogo} from "@clover/public/components/layout/main/logo";
import {getNavGroups} from "@clover/public/components/layout/main/footer/config";
import {FC} from "react";

export type FooterProps = {
  simple?: boolean;
}

export const Footer: FC<FooterProps> = (props) => {
  const { simple = false } = props;
  return simple ? <div className={"container border-t py-lg flex justify-center items-center space-x-lg"}>
    <div>© 2024 {tt("元一链科")}</div>
    <div className={"flex justify-start items-center space-x-sm"}>
      <IconGithubCircle className={"text-2xl text-secondary-foreground/50"}/>
      <Separator orientation={"vertical"} className={"h-4"}/>
      <IconX className={"text-xl text-secondary-foreground/50"}/>
    </div>
  </div> : <div className={"border-t w-full py-2xl"}>
    <div className={"container"}>
      <div className={"flex"}>
        <div className={"w-48"}>
          <LayoutLogo/>
        </div>
        <ul className={"flex flex-1 ml-4xl"}>
          {
            getNavGroups().map((group, index) => {
              return <li key={index} className={"flex-1 space-y-xs"}>
                <div className={"text-base"}>{group.title}</div>
                <ul className={"space-y-2xs"}>
                  {
                    group.items.map((item, index) => {
                      return <li key={index}>
                        <a className={"text-secondary-foreground/50"} href={item.href}>{item.title}</a>
                      </li>
                    })
                  }
                </ul>
              </li>
            })
          }
        </ul>
        <div className={"space-y-xs w-96"}>
          <div className={"text-base"}>{tt("订阅")}</div>
          <div className={"space-y-2xs"}>
            <div className={"text-secondary-foreground/50"}>{tt("了解新版本、新功能、指南和案例研究。")}</div>
            <div className={"relative"}>
              <Input className={"bg-secondary"}/>
              <div className={"absolute right-0 top-0 bottom-0 p-0.5"}>
                <Button variant={"outline"} size={"sm"}>{tt("订阅")}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"mt-2xl flex justify-center items-center"}>
        <div className={"space-y-sm flex-1"}>
          <div>© 2024 {tt("元一链科")}</div>
          <div className={"flex justify-start items-center space-x-sm"}>
            <IconGithubCircle className={"text-2xl text-secondary-foreground/50"}/>
            <Separator orientation={"vertical"} className={"h-4"}/>
            <IconX className={"text-xl text-secondary-foreground/50"}/>
          </div>
        </div>
      </div>
    </div>
  </div>
}
