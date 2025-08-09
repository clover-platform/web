import { Action } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const Recent = () => {
  const { t } = useTranslation()
  const actionClass = 'w-full justify-start px-1 py-1'
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-medium text-lg">{t('最近的项目')}</span>
        <Link className="link" href="/project">
          {t('查看全部')}
        </Link>
      </div>
      <div>
        <div className="!border-l-[20px] w-72 rounded-sm border border-l-primary/30 bg-white text-sm hover:shadow-md dark:bg-background">
          <div className="relative flex flex-col gap-3 p-3">
            <div className="-left-3 absolute top-3 size-6 rounded-sm bg-primary" />
            <div className="ml-2 font-medium text-base">Project A</div>
            <div className="flex flex-col gap-1">
              <div className="font-medium text-secondary-foreground/60 text-sm">{t('快速链接')}</div>
              <div className="-mx-2">
                <Action className={actionClass}>{t('我的待办任务')}</Action>
                <Action className={actionClass}>{t('已完成任务')}</Action>
              </div>
            </div>
          </div>
          <div className="border-t px-3 py-1">
            <div className="-mx-2 flex gap-1">
              <Action className="justify-start px-1 py-1">{t('面板')}</Action>
              <Action className="justify-start px-1 py-1">{t('甘特图')}</Action>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
