import { uploadHandle } from '@clover/public/utils/file'
import {
  type UploadFile,
  Uploader as UploaderComponent,
  type UploaderProps as UploaderPropsType,
} from '@easykit/design'
import { type FC, useEffect, useRef, useState } from 'react'

export type FileProps = {
  name: string
  url?: string
  type?: string
  size?: number
}

// 将 FileProps 转换为 UploadFile
const filePropsToUploadFile = (fileProps: FileProps): UploadFile => {
  return {
    name: fileProps.name,
    size: fileProps.size || 0,
    type: fileProps.type || '',
    status: 'done',
    response: fileProps.url,
  } as UploadFile
}

// 将 UploadFile 转换为 FileProps
const uploadFileToFileProps = (uploadFile: UploadFile): FileProps => {
  return {
    name: uploadFile.name,
    url: uploadFile.response as string,
    type: uploadFile.type,
    size: uploadFile.size,
  }
}

export type UploaderProps = Omit<UploaderPropsType, 'value' | 'onChange'> & {
  value?: FileProps[]
  onChange?: (files: FileProps[]) => void
}

export const Uploader: FC<UploaderProps> = ({ onChange, value, ...props }) => {
  const [files, setFiles] = useState<UploadFile[]>(() => {
    return value ? value.map(filePropsToUploadFile) : []
  })
  const isInternalUpdate = useRef(false)

  // 当外部 value 变化时更新内部状态，但要避免覆盖正在上传的文件
  useEffect(() => {
    // 如果是内部更新触发的，忽略
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false
      return
    }

    setFiles((current) => {
      // 如果外部没有传值，保持当前状态
      if (!value) {
        return current
      }

      // 如果外部传入空数组，只有当前没有上传中的文件时才清空
      if (value.length === 0) {
        const hasUploadingFiles = current.some((file) => file.status === 'uploading' || file.status === 'error')
        return hasUploadingFiles ? current : []
      }

      // 智能合并策略：保留上传中的文件，合并外部已完成的文件
      const externalFiles = value.map(filePropsToUploadFile)
      const uploadingOrErrorFiles = current.filter((file) => file.status === 'uploading' || file.status === 'error')

      // 如果没有上传中的文件，直接使用外部文件
      if (uploadingOrErrorFiles.length === 0) {
        return externalFiles
      }

      // 有上传中的文件时，需要合并：
      // 1. 保留所有上传中/错误的文件
      // 2. 添加外部的已完成文件（按文件名去重，避免覆盖上传中的文件）
      const uploadingFileNames = new Set(uploadingOrErrorFiles.map((f) => f.name))
      const externalCompletedFiles = externalFiles.filter((f) => !uploadingFileNames.has(f.name))

      return [...uploadingOrErrorFiles, ...externalCompletedFiles]
    })
  }, [value])

  const handleFilesChange = (newFiles: UploadFile[]) => {
    setFiles(newFiles)

    // 只同步状态为 'done' 的文件
    const doneFiles = newFiles.filter((file) => file.status === 'done')

    // 标记这是内部更新，避免 useEffect 重复处理
    isInternalUpdate.current = true
    onChange?.(doneFiles.map(uploadFileToFileProps))
  }

  return <UploaderComponent value={files} onChange={handleFilesChange} uploadHandle={uploadHandle} {...props} />
}