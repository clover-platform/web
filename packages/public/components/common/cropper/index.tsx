import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {FC, useState, useEffect, useRef} from "react";
import classNames from "classnames";
import {Button, Dialog, Spin, Uploader, useMessage} from "@easykit/design";
import {PlusIcon} from "@radix-ui/react-icons";
import {IconDelete} from "@arco-iconbox/react-clover";
import {dataURLToFile, fileToDataURL} from "@clover/public/utils/file";
import {upload} from "@clover/public/utils/file";
import {t} from '@clover/public/utils/i18next';

export type ImageCropperProps = {
  className?: string;
  cropperClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  aspectRatio?: number;
};

export const ImageCropper: FC<ImageCropperProps> = (props) => {
  const {
    className,
  } = props;

  const msg = useMessage();
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState<string>();
  const [result, setResult] = useState<string | undefined>(props.value);
  const [uploading, setUploading] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    setResult(props.value);
  }, [props.value]);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const dataURL = cropper?.getCroppedCanvas().toDataURL();
    const file = dataURLToFile(dataURL!, "cropped.png");
    setResult(dataURL);
    setVisible(false);
    preSignFile(file).then();
  };

  const reset = () => {
    props.onChange?.("");
    setSrc("");
    setResult("");
  }

  const preSignFile = async (file: File) => {
    setUploading(true);
    const {success, data, error} = await upload({
      file,
      name: file.name,
      contentType: file.type,
      type: 0,
    });
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

  return <>
    {
      result ? <div
        className={classNames(
          "border rounded-md flex justify-center items-center overflow-hidden group relative",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={"w-full h-full"}
          src={result}
          alt={"Result"}
        />
        {
          uploading ?
            <div className={"absolute top-0 left-0 bottom-0 right-0 bg-black/30 justify-center items-center flex"}>
              <Spin className={"w-4 h-4 text-white"}/>
            </div> : <div
              onClick={() => reset()}
              className={"absolute hidden group-hover:flex top-0 left-0 bottom-0 right-0 bg-black/30 justify-center items-center"}
            >
              <IconDelete className={"w-4 h-4 text-white cursor-pointer"}/>
            </div>
        }
      </div> : <Uploader
        onDropAccepted={onDropAccepted}
        showFileList={false}
        showButton={false}
        maxFiles={1}
        accept={{
          "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
        }}
      >
        <div
          className={classNames(
            "border rounded-md flex justify-center items-center p-2 outline-none",
            props.className
          )}
        >
          <PlusIcon className={"w-12 h-12 opacity-50"}/>
        </div>
      </Uploader>
    }

    <Dialog
      visible={visible}
      onCancel={() => setVisible(false)}
      maskClosable={false}
      title={t("裁剪图片")}
    >
      <div className={"-mb-2 flex items-center flex-col space-y-4"}>
        <Cropper
          ref={cropperRef}
          src={src}
          className={classNames("w-full max-h-[80vh]", props.cropperClassName)}
        />
        <div className={"flex justify-end w-full space-x-2"}>
          <Button onClick={onCrop}>{t("确定")}</Button>
          <Button onClick={() => setVisible(false)} variant={"outline"}>{t("取消")}</Button>
        </div>
      </div>
    </Dialog>
  </>
}
