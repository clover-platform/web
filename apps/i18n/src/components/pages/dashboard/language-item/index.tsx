import { LanguageIcon } from '@/components/common/language-icon'
import type { LanguageWithCount } from '@/types/pages/public'
import { Progress, TableCell, TableRow, Tooltip } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
export type LanguageItemProps = {
  onClick?: () => void
} & PropsWithChildren<LanguageWithCount>

export const LanguageItem: FC<LanguageItemProps> = (props) => {
  const { totalEntry, translatedEntry, verifiedEntry } = props
  const { t } = useTranslation()

  const translatedPercent = totalEntry ? Math.ceil((translatedEntry / totalEntry) * 100) : 0
  const verifiedPercent = translatedEntry ? Math.ceil((verifiedEntry / translatedEntry) * 100) : 0

  return (
    <TableRow onClick={props.onClick}>
      <TableCell>
        <div className="flex items-center justify-start">
          <LanguageIcon code={props.code} className="mr-2" /> {props.name}
        </div>
      </TableCell>
      <TableCell>
        <div className="w-full rounded-full border">
          <Progress value={verifiedPercent} style={{ width: `${translatedPercent}%` }} />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Tooltip content={t('翻译·校验')}>
          <div className="inline-flex rounded-sm bg-muted px-2 py-0.5 text-muted-foreground text-xs">
            <span>{translatedPercent}%</span> · <span>{verifiedPercent}%</span>
          </div>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
