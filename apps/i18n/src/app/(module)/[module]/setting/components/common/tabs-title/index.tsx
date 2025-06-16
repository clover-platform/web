import { getTabs } from "@/config/pages/module/setting/tabs";
import { useModule } from '@/hooks/use.module'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { useRouter } from "next/navigation";
import { type FC, useCallback } from 'react'

export type SettingTabsTitleProps = {
  active: string;
}

export const SettingTabsTitle: FC<SettingTabsTitleProps> = (props) => {
  const m = useModule();
  const router = useRouter();
  const onChange = useCallback((id: string) => {
    router.push(`/${m}/setting${id === 'general' ? '' : `/${id}`}`)
  }, [m, router])

  return <TabsTitle
    active={props.active}
    items={getTabs()}
    onChange={onChange}
  />
}
