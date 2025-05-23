import { Badge, Dropdown, DropdownMenuItemProps, Tooltip, useAlert, useMessage } from "@easykit/design";
import { Action } from "@clover/public/components/common/action";
import { ArrowLeftIcon, ArrowRightIcon, CopyIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditEntryButton } from "@/components/pages/worktop/main/panel/entry/edit/button";
import { useAtom } from "jotai";
import { branchesState, currentEntryState, entriesState } from "@/state/worktop";
import { useEntriesUpdater } from "@/components/layout/worktop/hooks";
import { FC, ReactNode } from "react";
import copy from 'copy-to-clipboard';
import { remove as removeRest } from "@/rest/entry";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { t } from "@clover/public/utils/locale.client";

type IconMenuItemProps = {
  icon?: ReactNode;
  label: string;
}

export const IconMenuItem: FC<IconMenuItemProps> = (props) => {
  return <div className={"flex justify-center items-center"}>
    <div className={"w-4 h-4 flex justify-center items-center mr-2"}>
      {props.icon}
    </div>
    <div className={"flex-1"}>{props.label}</div>
  </div>;
}

const menus: DropdownMenuItemProps[] = [
  {
    type: "item",
    id: "copy.key",
    label: <IconMenuItem icon={<CopyIcon className={"text-lg"} />} label={t("复制键值")} />,
  },
  {
    type: "item",
    id: "copy.value",
    label: <IconMenuItem icon={<CopyIcon className={"text-lg"} />} label={t("复制内容")} />
  },
  {
    type: "separator",
    id: "separator.1",
  },
  {
    type: "item",
    id: "remove",
    label: <IconMenuItem label={t("删除")} />,
  },
];

export const Detail = () => {
  const [entries] = useAtom(entriesState);
  const [current, setCurrent] = useAtom(currentEntryState);
  const entry = entries[current];
  const { update, remove } = useEntriesUpdater();
  const [branches] = useAtom(branchesState);
  const branch = branches.find(b => b.id === entry?.branchId);
  const msg = useMessage();
  const alert = useAlert();
  const { module } = useParams();
  const { t } = useTranslation();

  const prev = () => {
    if (current === entries.length - 1) {
      setCurrent(current - 1);
    }
  }

  const onItemClick = ({ id }: DropdownMenuItemProps) => {
    if (id === "copy.key") {
      copy(entry.identifier);
      msg.success(t("复制成功"))
    } else if (id === "copy.value") {
      copy(entry.value);
      msg.success(t("复制成功"))
    } else if (id === "remove") {
      alert.confirm({
        title: t("删除"),
        description: t("是否删除该词条"),
        onOk: async () => {
          const { success, message } = await removeRest({
            module: module as string,
            id: entry.id,
            branch: branch?.name || ''
          })
          if (success) {
            prev();
            await remove(entry.id);
          } else {
            msg.error(message);
          }
          return success;
        }
      })
    }
  }

  return <div className={"w-full"}>
    <div className={"flex justify-center items-center p-2 px-4"}>
      <div className={"flex-1 text-base font-medium"}>{t("原始内容")}</div>
      <div className={"flex"}>
        <Tooltip content={t("上一个")}>
          <Action disabled={current === 0} onClick={() => setCurrent(current - 1)}>
            <ArrowLeftIcon />
          </Action>
        </Tooltip>
        <Tooltip content={t("下一个")}>
          <Action disabled={current === entries.length - 1} onClick={() => setCurrent(current + 1)}>
            <ArrowRightIcon />
          </Action>
        </Tooltip>
        <EditEntryButton
          onSuccess={async () => {
            await update(entry.id);
          }}
          entry={entry}
        />
        <Dropdown
          items={menus}
          onItemClick={onItemClick}
          asChild={true}
          align={"end"}
        >
          <Action>
            <DotsHorizontalIcon />
          </Action>
        </Dropdown>

      </div>
    </div>
    <div className={"px-4 mb-4"}>
      {entry?.value}
    </div>
    <div className={"px-4 mb-4"}>
      <Badge className={"mr-2"}>{branch?.name}</Badge>
      <span className={"text-muted-foreground"}>{entry?.identifier}</span>
    </div>
  </div>
}
