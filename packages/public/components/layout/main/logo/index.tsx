import Logo from "@clover/public/components/common/logo";
import { useTranslation } from 'react-i18next';

export const LayoutLogo = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-start space-x-xs">
      <Logo />
      <div className="font-medium text-xl opacity-70">{t('幸运草')}</div>
    </div>
  )
}
