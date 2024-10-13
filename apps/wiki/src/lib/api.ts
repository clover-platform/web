import {upload} from "@clover/public/utils/file";

export class API {
    public static uploadImage = async (file: File) => {
        const { success, data, error } = await upload({
            file,
            name: file.name,
            contentType: file.type,
            type: 0,
        });
        if(success) {
            return data;
        }else{
            throw new Error(error);
        }
    }
}

export default API
