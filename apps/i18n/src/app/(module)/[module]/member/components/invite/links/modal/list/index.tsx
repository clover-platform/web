import { useModule } from '@/hooks/use.module'
import { list } from '@/rest/member.invite'
import { Dialog, type DialogProps, Empty, ScrollArea } from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteLinkItem } from './item'
import { InviteLinkItemLoading } from './item/loading'

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
    <Dialog {...props} title={t('管理链接')} maskClosable={false}>
      <div className="h-[380px] max-h-[80vh]">
        <ScrollArea className="h-full w-full">
          <div className="mr-2 space-y-6">
            {!loading && listData.map((item) => <InviteLinkItem onRevoke={onRevoke} key={item.id} item={item} />)}
            {/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
            {loading && Array.from({ length: 3 }).map((_, index) => <InviteLinkItemLoading key={index} />)}
            {!loading && listData.length === 0 && <Empty text={t('暂无链接')} />}
          </div>
        </ScrollArea>
      </div>
    </Dialog>
  )
}
