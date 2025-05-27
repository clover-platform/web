import { MemberInviteForm } from '@/components/pages/member/invite/form'
import { GetInviteLinkButton } from "@/components/pages/member/invite/links/button/get";
import { InviteLinkListButton } from '@/components/pages/member/invite/links/button/list'
import { useModule } from "@/hooks/use.module";
import { type MemberInviteData, send } from '@/rest/member.invite'
import type { MemberInviteRequest } from '@/types/pages/member'
import { Button, Dialog, type DialogProps, useMessage } from '@easykit/design'
import { type FC, useState } from 'react'
import { useTranslation } from "react-i18next";

export type InviteModalProps = {} & DialogProps;

export const InviteModal: FC<InviteModalProps> = (props) => {
  const [invite, setInvite] = useState<MemberInviteRequest>({
    roles: ['3'],
    emails: '',
    content: '',
  })
  const m = useModule();
  const [loading, setLoading] = useState(false);
  const msg = useMessage();
  const { t } = useTranslation();

  const onSubmit = async (data: MemberInviteData) => {
    setLoading(true);
    data.module = m;
    const { success, message } = await send(data);
    setLoading(false);
    if (success) {
      msg.success(t("邀请发送成功"));
      props.onCancel?.();
    } else {
      msg.error(message)
    }
  }

  return (
    <Dialog {...props} title={t('邀请成员')} maskClosable={false}>
      <MemberInviteForm onSubmit={onSubmit} onValuesChange={setInvite}>
        <div className="flex items-center justify-center">
          <div className="flex-1">
            <GetInviteLinkButton roles={invite.roles} disabled={!invite.roles.length} />
            <InviteLinkListButton />
          </div>
          <div>
            <Button loading={loading} type="submit">
              {t('发送邀请')}
            </Button>
          </div>
        </div>
      </MemberInviteForm>
    </Dialog>
  )
}
