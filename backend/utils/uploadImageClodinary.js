import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadImageClodinary = async(image)=>{
    try {
        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

        const uploadImage = await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({ folder : "binkeyit"},(error,uploadResult)=>{
                if(error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                return resolve(uploadResult);
            }).end(buffer)
        })

        return uploadImage;
    } catch (error) {
        console.error('Upload function error:', error);
        throw error;
    }
}

export default uploadImageClodinary