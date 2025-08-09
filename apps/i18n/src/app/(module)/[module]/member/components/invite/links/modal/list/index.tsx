import { InviteLinkItem } from './item'
import { InviteLinkItemLoading } from './item/loading'

import { type FC, useMemo } from 'react'
import { Dialog, type DialogProps, Empty, ScrollArea } from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useModule } from '@/hooks/use.module'
import { list } from '@/rest/member.invite'

export type InviteLinkListModalProps = {} & DialogProps

export const InviteLinkListModal: FC<InviteLinkListModalProps> = (props) => {
  const m = useModule()
  const { t } = useTranslation()
  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ['member:invite:list', m],
    queryFn: ({ queryKey }) => list(queryKey[1] as string),
    enabled: props.visible,
  })

  const listData = useMemo(() => {
    if (loading) {
      return []
    }
    return data || []
  }, [loading, data])

  const onRevoke = () => {
    refetch().then()
  }

  return (
    <Dialog {...props} maskClosable={false} title={t('管理链接')}>
      <div className="h-[380px] max-h-[80vh]">
        <ScrollArea className="h-full w-full">
          <div className="mr-2 space-y-6">
            {!loading && listData.map((item) => <InviteLinkItem item={item} key={item.id} onRevoke={onRevoke} />)}
            {/* biome-ignore lint/suspicious/noArrayIndexKey: <loading> */}
            {loading && Array.from({ length: 3 }).map((_, index) => <InviteLinkItemLoading key={index} />)}
            {!loading && listData.length === 0 && <Empty text={t('暂无链接')} />}
          </div>
        </ScrollArea>
      </div>
    </Dialog>
  )
}
