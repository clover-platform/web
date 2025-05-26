import {preSign} from "@clover/public/rest/assets";

const mimeTypeRegex = /:(.*?);/

export function fileToDataURL(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
} 

export function dataURLToFile(dataUrl: string, filename: string) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(mimeTypeRegex)?.[1]
  const str = atob(arr.at(-1) || '')
  let n = str.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = str.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export type UploadOptions = {
  name: string;
  file: File; // 文件
  type: 0 | 1; // 0: 公开 1: 私有
  contentType?: string, // 文件类型
  onProgress?: (percent: number, event: ProgressEvent) => void, // 进度回调,
}

export type UploadResult = {
  success: boolean;
  data?: string;
  error?: string;
}

export const upload = async (options: UploadOptions) => {
  const {onProgress, file, type} = options;
  return new Promise<UploadResult>((resolve, reject) => {
    preSign({
      fileName: options.name,
      contentType: options.contentType,
      length: file?.size,
      type
    }).then(({success, data, message}) => {
      if (success) {
        const {signedUrl, url} = data!;
        const xhr = new XMLHttpRequest();
        if (xhr.upload) {
          xhr.upload.onprogress = (event) => {
            let percent: number | undefined
            if (event.total > 0) {
              percent = (event.loaded / event.total) * 100
            }
            onProgress?.(Number.parseInt(`${percent}`, 10), event)
          }
        }
        xhr.onerror = function error(e) {
          reject({
            success: false,
            error: e.toString()
          });
        };
        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            return reject(new Error(`Failed to upload: ${xhr.status}`));
          }
          resolve({
            success: true,
            data: url
          });
        };
        xhr.open('put', signedUrl, true);
        xhr.send(file);
      } else {
        reject({
          success: false,
          error: message
        });
      }
    });
  });

}
