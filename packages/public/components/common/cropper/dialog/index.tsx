import { Button, Dialog, type DialogProps } from '@easykit/design'
import { type FC, useRef } from 'react'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import { useTranslation } from 'react-i18next'
import 'cropperjs/dist/cropper.css'
import classNames from 'classnames'

export type CropperDialogProps = DialogProps & {
  src?: string
  cropperClassName?: string
  onCrop: (dataURL: string) => void
}

export const CropperDialog: FC<CropperDialogProps> = (props) => {
  const { visible, src, onCancel, onCrop, ...rest } = props
  const { t } = useTranslation()
  const cropperRef = useRef<ReactCropperElement>(null)

  const crop = () => {
    const cropper = cropperRef.current?.cropper
    const dataURL = cropper?.getCroppedCanvas().toDataURL()
    onCrop(dataURL!)
  }

  return (
    <Dialog visible={visible} maskClosable={false} title={t('裁剪图片')} {...rest}>
      <div className="-mb-2 flex flex-col items-center space-y-4">
        <Cropper ref={cropperRef} src={src} className={classNames('max-h-[80vh] w-full', props.cropperClassName)} />
        <div className="flex w-full justify-end space-x-2">
          <Button onClick={crop}>{t('确定')}</Button>
          <Button onClick={onCancel} variant="outline">
            {t('取消')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}