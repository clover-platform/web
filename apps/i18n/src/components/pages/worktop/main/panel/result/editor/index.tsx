import { useAtom } from "jotai";
import { currentEntryState, entriesState } from "@/state/worktop";
import { Action } from "@clover/public/components/common/action";
import { CopyIcon } from "@radix-ui/react-icons";
import {
  Button,
  Tooltip,
} from "@easykit/design";
import { IconClear } from "@arco-iconbox/react-clover";
import { useCallback, useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { useResultSubmit } from "@/components/pages/worktop/main/panel/result/hooks/use.result.submit";
import bus from "@clover/public/events";
import { ENTRY_RESULT_AI_INSERT } from "@/events/worktop";
import { useTranslation } from "react-i18next";

export const Editor = () => {
  const [entries] = useAtom(entriesState);
  const [current] = useAtom(currentEntryState);
  const entry = entries[current];
  const [content, setContent] = useState(entry?.translation?.content);
  const [submit, loading] = useResultSubmit();
  const { t } = useTranslation();

  const onSave = useCallback(async () => {
    await submit(content!);
  }, [content, submit])

  useEffect(() => {
    bus.on(ENTRY_RESULT_AI_INSERT, setContent);
    return () => {
      bus.off(ENTRY_RESULT_AI_INSERT, setContent);
    }
  }, [setContent])

  return <div className={"w-full"}>
    <TextareaAutosize
      minRows={3}
      value={content}
      onChange={e => setContent(e.target.value)}
      placeholder={t("请输入翻译内容")}
      className={"border-none rounded-none shadow-none focus-visible:ring-0 px-4 py-2 w-full focus:outline-none resize-none"}
    />
    <div className={"flex justify-center items-center p-2 px-4"}>
      <div className={"flex-1 flex justify-start items-center"}>
        <Tooltip content={t("使用源语言填充")}>
          <Action onClick={() => setContent(entry?.value)}>
            <CopyIcon />
          </Action>
        </Tooltip>
        <Tooltip content={t("清空")}>
          <Action onClick={() => setContent('')}>
            <IconClear className={"text-base"} />
          </Action>
        </Tooltip>
      </div>
      <div>
        <Button
          loading={loading}
          variant={"outline"}
          onClick={onSave}
        >
          {t("保存")}
        </Button>
      </div>
    </div>
  </div>
}
