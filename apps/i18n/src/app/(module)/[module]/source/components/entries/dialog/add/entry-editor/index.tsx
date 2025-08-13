import type { Entry } from '../schema'

import { type FC, useEffect, useState } from 'react'
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@easykit/design'
import { Check, Edit3, Plus, X, XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export type EntryEditorProps = {
  value?: Entry[]
  onChange?: (value: Entry[]) => void
  limit?: number // limit = 0 means no limit
}

export const EntryEditor: FC<EntryEditorProps> = ({ value = [], onChange, limit }) => {
  const { t } = useTranslation()
  const [entries, setEntries] = useState<Entry[]>([])
  const [newEntry, setNewEntry] = useState<Entry>({
    identifier: '',
    value: '',
    context: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null)

  // 同步 props.value 到本地状态
  useEffect(() => {
    if (Array.isArray(value)) {
      setEntries(value)
    } else {
      setEntries([])
    }
  }, [value])

  // 添加词条
  const handleAddEntry = () => {
    if (!newEntry.identifier.trim() || !newEntry.value.trim()) {
      return
    }

    // 检查唯一标识是否已存在
    if (Array.isArray(entries) && entries.some((entry) => entry.identifier === newEntry.identifier)) {
      return
    }

    // 检查数量限制
    if (limit && limit > 0 && Array.isArray(entries) && entries.length >= limit) {
      return
    }

    const updatedEntries = [...entries, { ...newEntry }]
    setEntries(updatedEntries)
    onChange?.(updatedEntries)

    // 重置新词条表单
    setNewEntry({
      identifier: '',
      value: '',
      context: '',
    })
  }

  // 删除词条
  const handleDeleteEntry = (identifier: string) => {
    if (!Array.isArray(entries)) return
    const updatedEntries = entries.filter((entry) => entry.identifier !== identifier)
    setEntries(updatedEntries)
    onChange?.(updatedEntries)
  }

  // 更新新词条字段
  const handleNewEntryChange = (field: keyof Entry, value: string) => {
    setNewEntry((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 开始编辑词条
  const handleStartEdit = (entry: Entry) => {
    setEditingId(entry.identifier)
    setEditingEntry({ ...entry })
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingEntry(null)
  }

  // 保存编辑
  const handleSaveEdit = () => {
    if (!editingEntry || !editingId) return

    // 检查新的标识符是否与其他词条冲突（除了当前编辑的词条）
    if (
      editingEntry.identifier !== editingId &&
      Array.isArray(entries) &&
      entries.some((entry) => entry.identifier === editingEntry.identifier)
    ) {
      return
    }

    if (!Array.isArray(entries)) return

    const updatedEntries = entries.map((entry) => (entry.identifier === editingId ? editingEntry : entry))

    setEntries(updatedEntries)
    onChange?.(updatedEntries)
    setEditingId(null)
    setEditingEntry(null)
  }

  // 更新编辑中的词条字段
  const handleEditingEntryChange = (field: keyof Entry, value: string) => {
    if (!editingEntry) return
    setEditingEntry((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null
    )
  }

  // 检查是否可以保存编辑
  const canSaveEdit = !!(
    editingEntry &&
    editingId &&
    editingEntry.identifier.trim() &&
    editingEntry.value.trim() &&
    (editingEntry.identifier === editingId ||
      !Array.isArray(entries) ||
      !entries.some((entry) => entry.identifier === editingEntry.identifier))
  )

  // 检查是否可以添加新词条
  const canAddEntry =
    newEntry.identifier.trim() &&
    newEntry.value.trim() &&
    (!Array.isArray(entries) || !entries.some((entry) => entry.identifier === newEntry.identifier)) &&
    (!limit || limit === 0 || !Array.isArray(entries) || entries.length < limit)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('唯一标识')}</TableHead>
            <TableHead>{t('原文')}</TableHead>
            <TableHead>{t('上下文')}</TableHead>
            <TableHead className="w-16">{t('操作')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(entries) &&
            entries.map((entry) => {
              const isEditing = editingId === entry.identifier
              return (
                <TableRow key={entry.identifier}>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        className="min-w-0"
                        onChange={(e) => handleEditingEntryChange('identifier', e.target.value)}
                        placeholder={t('输入唯一标识')}
                        value={editingEntry?.identifier || ''}
                      />
                    ) : (
                      <div className="flex min-h-9 items-center">{entry.identifier}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        className="min-w-0"
                        onChange={(e) => handleEditingEntryChange('value', e.target.value)}
                        placeholder={t('输入原文')}
                        value={editingEntry?.value || ''}
                      />
                    ) : (
                      entry.value
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        className="min-w-0"
                        onChange={(e) => handleEditingEntryChange('context', e.target.value)}
                        placeholder={t('输入上下文（可选）')}
                        value={editingEntry?.context || ''}
                      />
                    ) : (
                      entry.context || '--'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {isEditing ? (
                        <>
                          <Button
                            disabled={!canSaveEdit}
                            onClick={handleSaveEdit}
                            size="sm"
                            type="button"
                            variant="default"
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button onClick={handleCancelEdit} size="sm" type="button" variant="outline">
                            <XCircle className="size-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => handleStartEdit(entry)} size="sm" type="button" variant="outline">
                            <Edit3 className="size-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteEntry(entry.identifier)}
                            size="sm"
                            type="button"
                            variant="destructive"
                          >
                            <X className="size-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          {/* 新词条输入行 */}
          <TableRow>
            <TableCell>
              <Input
                className="min-w-0"
                onChange={(e) => handleNewEntryChange('identifier', e.target.value)}
                placeholder={t('输入唯一标识')}
                value={newEntry.identifier}
              />
            </TableCell>
            <TableCell>
              <Input
                className="min-w-0"
                onChange={(e) => handleNewEntryChange('value', e.target.value)}
                placeholder={t('输入原文')}
                value={newEntry.value}
              />
            </TableCell>
            <TableCell>
              <Input
                className="min-w-0"
                onChange={(e) => handleNewEntryChange('context', e.target.value)}
                placeholder={t('输入上下文（可选）')}
                value={newEntry.context}
              />
            </TableCell>
            <TableCell>
              <Button disabled={!canAddEntry} onClick={handleAddEntry} size="sm" type="button" variant="default">
                <Plus className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-left" colSpan={4}>
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <span>
                  {t('已添加')} {Array.isArray(entries) ? entries.length : 0} {t('个词条')}
                  {limit && limit > 0 && (
                    <span className="ml-2">
                      ({Array.isArray(entries) ? entries.length : 0}/{limit})
                    </span>
                  )}
                </span>
                {limit && limit > 0 && Array.isArray(entries) && entries.length >= limit && (
                  <span className="text-orange-600">{t('已达到最大数量限制')}</span>
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
