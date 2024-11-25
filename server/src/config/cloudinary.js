import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET    

  
});

const uploadOnCloudinary = async (localFilePath) => {

    try {
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto',
            folder: 'course-content'
        })

        fs.unlinkSync(localFilePath);//remove the file from local storage after uploaded on cloudinary

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath);//remove the file from local storage after uploaded on cloudinary

        return error;
    }
    

}

export {uploadOnCloudinary};



 