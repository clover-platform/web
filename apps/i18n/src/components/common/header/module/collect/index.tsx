import { Empty } from "@easykit/design"
import { useTranslation } from "react-i18next"

export const ModuleCollect = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Empty text={t('你关注的模块在此处显示')} />
    </div>
  )
}