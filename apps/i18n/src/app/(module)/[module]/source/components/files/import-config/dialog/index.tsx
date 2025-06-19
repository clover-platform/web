import { useModule } from '@/hooks/use.module'
import { preview } from '@/rest/source'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Dialog,
  type DialogProps,
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
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]

export type ImportConfigDialogProps = {
  fileId: number
} & DialogProps

export const ImportConfigDialog: FC<ImportConfigDialogProps> = (props) => {
  const { fileId, visible, ...rest } = props
  const { t } = useTranslation()
  const m = useModule()

  const { data, isLoading } = useQuery({
    queryKey: ['source:file:preview', fileId],
    queryFn: () => preview({ module: m, fileId }),
    enabled: visible,
  })

  const footer = (
    <div className="flex gap-2">
      <Button>{t('导入')}</Button>
      <Button variant="outline" onClick={props.onCancel}>
        {t('取消')}
      </Button>
    </div>
  )

  return (
    <Dialog
      maskClosable={false}
      footer={footer}
      title={t('导入配置')}
      visible={visible}
      className="w-[90vw] max-w-full duration-200"
      {...rest}
    >
      <div className="flex w-full flex-col gap-4">
        <Alert>{t('我们将提供文件第一个sheet的前5条数据进行预览')}</Alert>
        <div className="flex gap-2">
          <Button disabled={true} variant="outline">
            {t('重置')}
          </Button>
          <Checkbox>{t('不导入第一行')}</Checkbox>
        </div>
        <Card>
          <ScrollArea className="relative w-[calc(90vw-100px)] duration-200">
            <Table className="w-max min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{invoice.totalAmount}</TableCell>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{invoice.totalAmount}</TableCell>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Card>
      </div>
    </Dialog>
  )
}