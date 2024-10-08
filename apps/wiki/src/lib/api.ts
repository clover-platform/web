export class API {
    public static uploadImage = async (_file: File) => {
        console.log('Image upload is disabled in the demo... Please implement the API.uploadImage method in your project.')
        await new Promise(r => setTimeout(r, 500))
        return '/android-chrome-192x192.png';
    }
}

export default API