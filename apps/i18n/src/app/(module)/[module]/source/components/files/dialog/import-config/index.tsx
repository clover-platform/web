import { useModule } from '@/hooks/use.module'
import { importFile, preview } from '@/rest/source'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Dialog,
  type DialogProps,
  Loading,
  ScrollArea,
  ScrollBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useMessage,
} from '@easykit/design'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type FC, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderSelect } from './header-select'

export type ImportConfigDialogProps = {
  fileId: number
} & DialogProps

export const ImportConfigDialog: FC<ImportConfigDialogProps> = (props) => {
  const { fileId, visible, ...rest } = props
  const { t } = useTranslation()
  const m = useModule()
  const msg = useMessage()
  const [selects, setSelects] = useState<Record<number, string>>({})
  const [skipFirstRow, setSkipFirstRow] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { mutate: importFileMutate, isPending: isImporting } = useMutation({
    mutationFn: importFile,
    onSuccess: () => {
      props.onCancel?.()
      queryClient.invalidateQueries({ queryKey: ['module:source:files'] })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['source:file:preview', fileId],
    queryFn: () => preview({ module: m, fileId }),
    enabled: visible,
  })

  useEffect(() => {
    if (!visible) {
      reset()
    }
  }, [visible])

  // 处理导入
  const handleImport = () => {
    // 校验必需字段
    const selectedValues = Object.values(selects)
    const hasIdentifier = selectedValues.includes('identifier')
    const hasValue = selectedValues.includes('value')

    if (!(hasIdentifier && hasValue)) {
      msg.error(t('标识列和原文列是必选的'))
      return
    }

    console.log('选择的列映射:', selects)
    console.log('跳过第一行:', skipFirstRow)

    // 如果 selects Record<number, string> value string 为空，则移除 key number
    const newSelects = Object.fromEntries(Object.entries(selects).filter(([_, value]) => value !== ''))
    console.log('新的选择:', newSelects)

    importFileMutate({
      module: m,
      fileId,
      config: newSelects,
      skipFirstRow,
    })
  }

  // 重置选择
  const reset = () => {
    setSelects({})
    setSkipFirstRow(false)
  }

  const footer = (
    <div className="flex gap-2">
      <Button onClick={handleImport} loading={isImporting}>
        {t('导入')}
      </Button>
      <Button variant="outline" onClick={props.onCancel} disabled={isImporting}>
        {t('取消')}
      </Button>
    </div>
  )

  const columnSize = useMemo(() => {
    if (!isFetched) return 0
    if (!data) return 0
    return Math.max(...data.map((row) => row.length))
  }, [data, isFetched])

  // 获取已选择的值，用于禁用重复选择
  const selectedValues = useMemo(() => {
    return Object.values(selects).filter(Boolean)
  }, [selects])

  // 检查是否有选择的值
  const hasSelections = useMemo(() => {
    return selectedValues.length > 0
  }, [selectedValues])

  // 处理列选择变化
  const handleColumnSelect = (columnIndex: number, value: string) => {
    setSelects((prev) => ({
      ...prev,
      [columnIndex]: value,
    }))
  }

  return (
    <Dialog
      maskClosable={false}
      footer={footer}
      title={t('导入配置')}
      visible={visible}
      className="w-[90vw] max-w-[960px] duration-200"
      {...rest}
    >
      <Loading loading={isLoading || isImporting}>
        <div className="flex w-full flex-col gap-4">
          <Alert>{t('我们将提供文件第一个工作簿的前5条数据进行预览')}</Alert>
          <div className="flex gap-2">
            <Button variant="outline" onClick={reset} disabled={!hasSelections}>
              {t('重置')}
            </Button>
            <Checkbox checked={skipFirstRow} onCheckedChange={(v) => setSkipFirstRow(v as boolean)}>
              {t('不导入第一行')}
            </Checkbox>
          </div>
          <Card contentClassName="p-0" className="rounded-md p-0">
            <ScrollArea className="relative w-[calc(90vw-50px)] max-w-[calc(960px-50px)] duration-200">
              <Table className="w-max min-w-full">
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    {Array.from({ length: columnSize }).map((_, index) => {
                      return (
                        <TableHead key={`col-${index + 1}`}>
                          <div className="my-1">
                            <HeaderSelect
                              value={selects[index]}
                              onChange={(value) => handleColumnSelect(index, value)}
                              disabledKeys={selectedValues.filter((v) => v !== selects[index])}
                            />
                          </div>
                        </TableHead>
                      )
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((row, rowIndex) => (
                    <TableRow
                      key={`row-${rowIndex + 1}`}
                      className={skipFirstRow && rowIndex === 0 ? 'opacity-40' : ''}
                    >
                      {Array.from({ length: columnSize }).map((_, colIndex) => {
                        return (
                          <TableCell key={`column-${colIndex + 1}`}>
                            <div className="mx-1.5">{row[colIndex] || '--'}</div>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Card>
        </div>
      </Loading>
    </Dialog>
  )
}