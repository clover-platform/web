import Cropper, {ReactCropperElement, ReactCropperProps} from "react-cropper";
import "cropperjs/dist/cropper.css";
import {FC, useRef, useState} from "react";
import classNames from "classnames";
import {Button, Dialog, Uploader} from "@atom-ui/core";
import {PlusIcon} from "@radix-ui/react-icons";
import {IconDelete} from "@arco-iconbox/react-clover";

export type ImageCropperProps = {
    className?: string;
    cropperClassName?: string;
    value?: string;
    onChange?: (value: string) => void;
} & ReactCropperProps;

function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    })
}

export const ImageCropper: FC<ImageCropperProps> = (props) => {
    const {
        className,
        ...rest
    } = props;

    const [visible, setVisible] = useState(false);
    const [src, setSrc] = useState<string>();
    const cropperRef = useRef<ReactCropperElement>(null);
    const [result, setResult] = useState<string>();
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setResult(cropper?.getCroppedCanvas().toDataURL());
        setVisible(false);
    };

    const onDropAccepted = (files: File[]) => {
         getBase64(files[0]).then((src) => {
             setSrc(src as string);
             setVisible(true);
         });
    }

    return <div>
        {
            result ? <div
                className={classNames(
                    "border rounded-md flex justify-center items-center overflow-hidden group relative",
                    props.className
                )}
            >
                <img
                    className={"w-full h-full"}
                    src={result}
                    alt={"Result"}
                />
                <div
                    onClick={() => setResult("")}
                    className={"absolute hidden group-hover:flex top-0 left-0 bottom-0 right-0 bg-black/30 justify-center items-center"}
                >
                    <IconDelete className={"w-4 h-4 text-white cursor-pointer"} />
                </div>
            </div> : <Uploader
                onDropAccepted={onDropAccepted}
                showFileList={false}
                showButton={false}
                maxFiles={1}
            >
                <div
                    className={classNames(
                        "border rounded-md flex justify-center items-center p-2",
                        props.className
                    )}
                >
                    <PlusIcon className={"w-12 h-12 opacity-50"} />
                </div>
            </Uploader>
        }

        <Dialog
            visible={visible}
            onCancel={() => setVisible(false)}
            maskClosable={false}
        >
            <div className={"pt-4 -mb-2 flex items-center flex-col space-y-4"}>
                <Cropper
                    src={src}
                    className={classNames("w-full", props.cropperClassName)}
                    ref={cropperRef}
                    {...rest}
                />
                <div className={"flex justify-end w-full space-x-2"}>
                    <Button onClick={onCrop}>{"{#确定#}"}</Button>
                    <Button onClick={() => setVisible(false)} variant={"outline"}>{"{#取消#}"}</Button>
                </div>
            </div>
        </Dialog>
    </div>
}
