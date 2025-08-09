import { type FC, useState } from 'react'
import { Button, Avatar as EasykitAvatar, Spin, Uploader, type UploadFile, useMessage } from '@easykit/design'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { CropperDialog } from '@clover/public/components/common/cropper/dialog'
import { useStateLoader } from '@clover/public/components/layout/hooks/use.state.loader'
import { useProfile } from '@clover/public/hooks'
import { dataURLToFile, fileToDataURL, upload } from '@clover/public/utils/file'
import { updateAvatar } from '@/rest/profile'

export type AvatarProps = {
  src: string
  fallback: string
  id: number
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { src, fallback, id } = props
  const profile = useProfile()
  const isOwner = profile.id === id
  const [fileSrc, setFileSrc] = useState<string>()
  const [visible, setVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const msg = useMessage()
  const queryClient = useQueryClient()
  const { username } = useParams()
  const load = useStateLoader()
  const { t } = useTranslation()
  const m = useMessage()
  const [files, setFiles] = useState<UploadFile[]>([])

  const onDropAccepted = (files: File[]) => {
    fileToDataURL(files[0]).then((src) => {
      setFileSrc(src as string)
      setVisible(true)
    })
  }

  const reset = () => {
    setFileSrc('')
  }

  const { mutate, isPending } = useMutation({
    mutationFn: updateAvatar,
    onSuccess: async () => {
      setFiles([])
      await queryClient.invalidateQueries({ queryKey: ['profile', username] })
      await load()
    },
    onError: (error) => {
      m.error(error.message)
      setFiles([])
    },
  })

  const uploadFile = async (file: File) => {
    setUploading(true)
    const { success, data, error } = await upload({
      file,
      name: file.name,
      contentType: file.type,
      type: 0,
    })
    setUploading(false)
    if (success) {
      mutate({
        url: data!,
      })
    } else {
      reset()
      msg.error(error)
    }
  }

  const onCrop = (dataURL: string) => {
    const file = dataURLToFile(dataURL!, 'cropped.png')
    setVisible(false)
    uploadFile(file).then()
  }

  return (
    <div className="!h-[300px] relative w-full">
      <EasykitAvatar
        className="h-full w-full"
        fallback={fallback}
        fallbackClassName="text-2xl bg-black/5 dark:bg-white/5"
        src={src}
      />
      {isOwner ? (
        <>
          <Uploader
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            }}
            maxFiles={1}
            onChange={setFiles}
            onDropAccepted={onDropAccepted}
            showButton={false}
            showFileList={false}
            value={files}
          >
            <Button
              className="-translate-x-1/2 absolute bottom-0 left-1/2 translate-y-1/2"
              disabled={uploading || isPending}
              variant="outline"
            >
              {uploading || isPending ? <Spin /> : <Pencil2Icon />} {t('编辑')}
            </Button>
          </Uploader>
          <CropperDialog onCancel={() => setVisible(false)} onCrop={onCrop} src={fileSrc} visible={visible} />
        </>
      ) : null}
    </div>
  )
}
