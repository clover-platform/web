import { Dialog, DialogProps, Empty, ScrollArea } from "@easykit/design";
import { FC, useEffect, useState, useCallback } from "react";
import { list } from "@/rest/member.invite";
import { MemberInvite } from "@/types/pages/member";
import { InviteLinkItem } from "@/components/pages/member/invite/links/modal/list/item";
import { InviteLinkItemLoading } from "@/components/pages/member/invite/links/modal/list/item/loading";
import { useModule } from "@/hooks/use.module";
import { useTranslation } from "react-i18next";

export type InviteLinkListModalProps = {} & DialogProps;

export const InviteLinkListModal: FC<InviteLinkListModalProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const m = useModule();
  const [listData, setListData] = useState<MemberInvite[]>([]);
  const { t } = useTranslation();
  
  const load = useCallback(async () => {
    setLoading(true);
    const { success, data } = await list({
      module: m,
    });
    setLoading(false);
    if (success) {
      setListData(data!);
    }
  }, [m]);

  useEffect(() => {
    if (props.visible) {
      load().then();
    } else {
      setListData([]);
    }
  }, [load, props.visible]);

  const onRevoke = () => {
    load().then();
  }

  return <Dialog
    {...props}
    title={t("管理链接")}
    maskClosable={false}
  >
    <div className={"h-[380px] max-h-[80vh]"}>
      <ScrollArea className={"w-full h-full"}>
        <div className={"space-y-6 mr-2"}>
          {!loading && listData.map((item) => <InviteLinkItem onRevoke={onRevoke} key={item.id} item={item} />)}
          {loading && Array.from({ length: 3 }).map((_, index) => <InviteLinkItemLoading key={index} />)}
          {!loading && listData.length === 0 && <Empty text={t("暂无链接")} />}
        </div>
      </ScrollArea>
    </div>
  </Dialog>
}
