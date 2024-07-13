export function fileToDataURL(file: File) {
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

export function dataURLToFile(dataUrl: string, filename: string) {
    let arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)?.[1],
        str = atob(arr[arr.length - 1]),
        n = str.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = str.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
