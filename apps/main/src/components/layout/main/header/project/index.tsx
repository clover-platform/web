import { ProjectCollect } from '@/components/layout/main/header/project/collect'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from "react-i18next";

export const Project = () => {
  const { t } = useTranslation();
  return (
    <DropdownMenuContent className="w-96" align="start">
      <ProjectCollect />
      <DropdownMenuSeparator />
      <Link href="/project">
        <DropdownMenuItem>{t('查看所有项目')}</DropdownMenuItem>
      </Link>
      <Link href="/project/new">
        <DropdownMenuItem>{t('创建项目')}</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  ) 
}
