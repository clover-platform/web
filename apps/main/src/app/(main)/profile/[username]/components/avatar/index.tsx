import { updateAvatar } from '@/rest/profile'
import { CropperDialog } from '@clover/public/components/common/cropper/dialog'
import { useStateLoader } from '@clover/public/components/layout/hooks/use.state.loader'
import { useProfile } from '@clover/public/hooks'
import { dataURLToFile, fileToDataURL, upload } from '@clover/public/utils/file'
import { Button, Avatar as EasykitAvatar, Spin, Uploader, useMessage } from '@easykit/design'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
      await queryClient.invalidateQueries({ queryKey: ['profile', username] })
      await load()
    },
  })

  const preSignFile = async (file: File) => {
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
    preSignFile(file).then()
  }

  return (
    <div className="!h-[300px] relative w-full">
      <EasykitAvatar
        fallbackClassName="text-2xl bg-black/5 dark:bg-white/5"
        className="h-full w-full"
        src={src}
        fallback={fallback}
      />
      {isOwner ? (
        <>
          <Uploader
            onDropAccepted={onDropAccepted}
            showFileList={false}
            showButton={false}
            maxFiles={1}
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            }}
          >
            <Button
              wrapper={false}
              disabled={uploading || isPending}
              variant="outline"
              className="-translate-x-1/2 absolute bottom-0 left-1/2 translate-y-1/2"
            >
              {uploading || isPending ? <Spin /> : <Pencil2Icon />} {t('编辑')}
            </Button>
          </Uploader>
          <CropperDialog visible={visible} onCancel={() => setVisible(false)} src={fileSrc} onCrop={onCrop} />
        </>
      ) : null}
    </div>
  )
}