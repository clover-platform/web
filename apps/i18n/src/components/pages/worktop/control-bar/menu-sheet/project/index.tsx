import { Command, CommandInput, CommandItem, CommandList, Separator, Spin } from "@easykit/design";
import { IconShare } from "@arco-iconbox/react-clover";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { all } from "@/rest/module";
import { CheckIcon } from '@radix-ui/react-icons';
import { useTranslation } from "react-i18next";

export const MenuProjectSheet = () => {
  const params = useParams();
  const { module } = params;
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any>([]);
  const { t } = useTranslation();

  const switchProject = (identifier: string) => {
    location.href = `/i18n/${identifier}/worktop`;
  }

  const open = (url: string) => {
    window.open(`/i18n/${module}/${url}`, `_blank`);
  }

  const load = async () => {
    setLoading(true);
    const { success, data } = await all({});
    setLoading(false);
    setProjects(success ? data : []);
  }

  useEffect(() => {
    load().then();
  }, [])

  return <div className={"space-y-2"}>
    <div className={"text-xl font-bold"}>{t("项目")}</div>
    <Command className={"h-auto"}>
      <CommandList className={"p-0"}>
        <CommandItem onSelect={() => open('dashboard')}>
          <div className={"flex justify-center items-center w-full"}>
            <span className={"flex-1"}>{t("概览")}</span>
            <IconShare />
          </div>
        </CommandItem>
        <CommandItem onSelect={() => open('activity')}>
          <div className={"flex justify-center items-center w-full"}>
            <span className={"flex-1"}>{t("动态")}</span>
            <IconShare />
          </div>
        </CommandItem>
        <CommandItem onSelect={() => open('setting')}>
          <div className={"flex justify-center items-center w-full"}>
            <span className={"flex-1"}>{t("设置")}</span>
            <IconShare />
          </div>
        </CommandItem>
      </CommandList>
    </Command>
    <Separator />
    <div className={"text-muted-foreground text-xs"}>{t("打开项目")}</div>
    <Command className={"h-auto"}>
      <CommandInput className={"h-8"} placeholder={t("请输入关键词")} />
      {
        loading ? <div className={"flex justify-center items-center p-6"}>
          <Spin />
        </div> : <CommandList className={"p-0 mt-2"}>
          {
            projects.map((item: any) => {
              return <CommandItem key={item.id} onSelect={() => switchProject(item.identifier)}>
                <div className={"flex justify-center items-center w-full"}>
                  <span className={"flex-1"}>{`${item.name} [${item.identifier}]`}</span>
                  {item.identifier === module ? <CheckIcon /> : null}
                </div>
              </CommandItem>
            })
          }
        </CommandList>
      }
    </Command>
  </div>
}
