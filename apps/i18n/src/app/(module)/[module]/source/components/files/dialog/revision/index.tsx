
import { revisionList } from '@/rest/source'
import {
  Badge,
  Dialog,
  type DialogProps,
  Empty,
  Loading,
  ScrollArea,
  ScrollBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type RevisionDialogProps = {
  fileId: number
} & DialogProps

export const RevisionDialog: FC<RevisionDialogProps> = (props) => {
  const { module } = useParams()
  const { fileId, visible, ...rest } = props
  const { t } = useTranslation()

  const { data, isLoading } = useQuery({
    queryKey: ['revision:list', module, fileId],
    queryFn: ({ queryKey }) => revisionList({ module: queryKey[1] as string, fileId: queryKey[2] as number }),
    enabled: visible,
  })

  return (
    <Dialog
      className="w-[90vw] max-w-[800px] duration-200"
      {...rest}
      visible={visible}
      title={t('变更记录')}
      maskClosable={false}
    >
      <Loading loading={isLoading}>
        <ScrollArea className="relative w-[calc(90vw-50px)] max-w-[calc(800px-50px)] duration-200">
          <Table className="w-max min-w-full">
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead>{t('版本')}</TableHead>
                <TableHead>{t('变更时间')}</TableHead>
                <TableHead>{t('新增')}</TableHead>
                <TableHead>{t('更新')}</TableHead>
                <TableHead>{t('删除')}</TableHead>
                <TableHead className="w-20 text-center">{t('操作')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading || !data?.length ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <Empty text={isLoading ? t('加载中...') : t('暂无变更记录')} />
                  </TableCell>
                </TableRow>
              ) : null}
              {data?.map((row, rowIndex) => (
                <TableRow key={`row-${rowIndex + 1}`}>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>{row.createTime}</TableCell>
                  <TableCell>{row.addedSize}</TableCell>
                  <TableCell>{row.updatedSize}</TableCell>
                  <TableCell>{row.deletedSize}</TableCell>
                  <TableCell className="text-center">
                    {row.current ? (
                      <Badge variant="outline">{t('当前')}</Badge>
                    ) : (
                      // biome-ignore lint/a11y/useValidAnchor: <explanation>
                      <a className="cursor-pointer hover:text-primary">{t('还原')}</a>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Loading>
    </Dialog>
  )
}