import {IconDelete} from "@arco-iconbox/react-clover";
import {dataURLToFile, fileToDataURL} from "@clover/public/utils/file";
import {upload} from "@clover/public/utils/file";
import { Spin, Uploader, useMessage } from '@easykit/design'
import { PlusIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { type FC, useEffect, useState } from 'react'
import { CropperDialog } from './dialog'

export type ImageCropperProps = {
  className?: string;
  cropperClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  aspectRatio?: number;
};

export const ImageCropper: FC<ImageCropperProps> = (props) => {
  const { className } = props
  
  const msg = useMessage()
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState<string>();
  const [result, setResult] = useState<string | undefined>(props.value);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setResult(props.value);
  }, [props.value]);

  const onCrop = (dataURL: string) => {
    const file = dataURLToFile(dataURL!, 'cropped.png')
    setResult(dataURL)
    setVisible(false)
    preSignFile(file).then()
  }

  const reset = () => {
    props.onChange?.("");
    setSrc("");
    setResult("");
  }

  const preSignFile = async (file: File) => {
    setUploading(true);
    const { success, data, error } = await upload({
      file,
      name: file.name,
      contentType: file.type,
      type: 1,
    })
    setUploading(false);
    if (success) {
      setResult(data!);
      props.onChange?.(data!);
    } else {
      reset();
      msg.error(error);
    }
  }

  const onDropAccepted = (files: File[]) => {
    fileToDataURL(files[0]).then((src) => {
      setSrc(src as string);
      setVisible(true);
    });
  }

  return (
    <>
      {result ? (
        <div
          className={classNames(
            'group relative flex items-center justify-center overflow-hidden rounded-md border',
            className
          )}
        >
          {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
          <img className="h-full w-full" src={result} alt="Result" />
          {uploading ? (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/30">
              <Spin className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div
              onClick={() => reset()}
              className="absolute top-0 right-0 bottom-0 left-0 hidden items-center justify-center bg-black/30 group-hover:flex"
            >
              <IconDelete className="h-4 w-4 cursor-pointer text-white" />
            </div>
          )}
        </div>
      ) : (
        <Uploader
          onDropAccepted={onDropAccepted}
          showFileList={false}
          showButton={false}
          maxFiles={1}
          accept={{
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
          }}
        >
          <div
            className={classNames(
              'flex items-center justify-center rounded-md border p-2 outline-none',
              props.className
            )}
          >
            <PlusIcon className="h-12 w-12 opacity-50" />
          </div>
        </Uploader>
      )}

      <CropperDialog
        visible={visible}
        onCancel={() => setVisible(false)}
        src={src}
        cropperClassName={props.cropperClassName}
        onCrop={onCrop}
      />
    </>
  )
}
