'use client';

import type { ModuleLayoutProps } from '@/components/layout/module'
import { ActivityList } from '@/components/pages/activity/list'
import { useModule } from '@/hooks/use.module'
import { list as listRest } from '@/rest/activity'
import type { Activity, ActivityGroup } from '@/types/pages/activity'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { Button } from '@easykit/design'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ActivityPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'activity',
  })
  const m = useModule()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Activity[]>([])
  const [total, setTotal] = useState(0)
  const pageRef = useRef(1)

  const load = useCallback(
    async (options?: { append?: boolean }) => {
      const { append = false } = options || {}
      if (!append) setList([])
      setLoading(true)
      const { success, data: result } = await listRest({
        page: pageRef.current,
        size: 10,
        module: m,
      })

      setLoading(false)
      if (success && result) {
        const { data, total } = result
        setList([...(append ? list : []), ...((data || []) as Activity[])])
        setTotal(total)
      }
    },
    [list, m]
  )

  const loadMore = () => {
    pageRef.current += 1
    load({ append: true }).then()
  }

  useEffect(() => {
    load().then()
  }, [load])

  const items = useMemo<ActivityGroup[]>(() => {
    // 分组逻辑
    const groupedByFormattedCreateTime = list.reduce(
      (accumulator: { [key: string]: Activity[] }, currentValue: Activity) => {
        const formattedDate = dayjs(currentValue.createTime).format('YYYY-MM-DD')
        if (!accumulator[formattedDate]) {
          accumulator[formattedDate] = []
        }
        accumulator[formattedDate].push(currentValue)
        return accumulator
      },
      {}
    )

    // 对键进行倒序排序
    const sortedKeys = Object.keys(groupedByFormattedCreateTime).sort((a, b) => dayjs(b).diff(dayjs(a)))

    // 根据排序后的键组织成新的数组
    return sortedKeys.map((key) => ({
      time: key,
      list: groupedByFormattedCreateTime[key],
    }))
  }, [list])

  return (
    <>
      <TitleBar title={t('动态')} border={false} />
      <ActivityList loading={loading} items={items} />
      {!loading && total > list.length ? (
        <div className="flex w-full justify-center">
          <Button onClick={loadMore} variant="link">
            {t('加载更多')}
          </Button>
        </div>
      ) : null}
    </>
  )
}
