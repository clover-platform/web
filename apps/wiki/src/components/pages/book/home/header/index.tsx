import {DEFAULT_COVER} from "@/config/book";
import type { Book } from '@/types/module/book'
import { Action } from '@clover/public/components/common/action'
import {UserList} from "@clover/public/components/common/user-list";
import { t } from '@clover/public/locale'
import {Dropdown} from "@easykit/design";
import { DotsHorizontalIcon, StarIcon } from '@radix-ui/react-icons'
import {useRouter} from "next/navigation";
import type { FC } from 'react'

export type HomeHeaderProps = {
    data?: Book;
    onEdit?: () => void;
}

export const HomeHeader: FC<HomeHeaderProps> = (props) => {
    const { data } = props;
    const router = useRouter();

    return (
      <div className={'flex space-x-4'}>
        <div className={'h-9 w-9 overflow-hidden rounded-md bg-secondary'}>
          <img src={data?.logo || DEFAULT_COVER} alt={'LOGO'} className={'h-full w-full bg-cover'} />
        </div>
        <div className={'flex-1 space-y-2'}>
          <div className={'font-medium text-2xl'}>{data?.name}</div>
          <div className={'flex flex-wrap text-secondary-foreground/50'}>
            <div className={'mr-4 space-x-0.5'}>
              <span className={'font-bold'}>2</span>
              <span>{t('文章')}</span>
            </div>
            <div className={'mr-4 space-x-0.5'}>
              <span className={'font-bold'}>2800</span>
              <span>{t('字')}</span>
            </div>
          </div>
          <UserList items={data?.members} />
        </div>
        <div className={'flex items-start justify-center space-x-1'}>
          <Action className={'h-8 w-8'}>
            <StarIcon />
          </Action>
          <Dropdown
            items={[
              {
                label: t('编辑首页'),
                type: 'item',
                id: 'edit.home.page',
                onItemClick: () => props.onEdit?.(),
              },
              {
                label: t('设置'),
                type: 'item',
                id: 'setting',
                onItemClick: (item, e) => {
                  router.push(`/wiki/book/${data?.path}/setting`)
                },
              },
            ]}
            asChild={true}
          >
            <Action className={'h-8 w-8'}>
              <DotsHorizontalIcon />
            </Action>
          </Dropdown>
        </div>
      </div>
    )
}
