import fs from 'fs';
import { Upload } from "@aws-sdk/lib-storage";


let request = function({s3}){

    this.req_path = "/upload_photos";
    this.req_type = "post";
    this.callbacks = [
        "uploads",
        "central_auth",
        "upload_photos",
        "add_photo_links",
        "add_album_update_log",
        "add_to_feeds"
    ];
    
    var upload_file = async (path_name, file, bucket_name) => {

        return new Upload({
                client: s3,
                params: {
                    Bucket: bucket_name,
                    Key: path_name,
                    Body: file.buffer,
                    ContentType: file.mimetype
                },
        });

    };

    let target_id_options = ['album_id','post_id','profile_id'];
    
    this.req = async (req, res, next)=>{
        
        const uploadedFiles = req.files;
        const {target_id_type, target_id, album_name} = JSON.parse(req.body.metadata);
        const {user_id} = req.auth;

        
        if (!uploadedFiles 
            || uploadedFiles.length === 0 
            || !target_id_type 
            || !target_id 
            || isNaN(parseInt(user_id)) 
            || !target_id_options.includes(target_id_type)) {
    
            return res.status(400).json({message: 'No files uploaded.'});
            
        }
        
        let photo_urls = [];
        let complete_upload = 0;
        
        //Go through each file
        await uploadedFiles.forEach(async (file) => {

            const s3_bucket_path = `users/${user_id}/${target_id_type}/${album_name}/${file.originalname}`;
            
            let upload = await upload_file(s3_bucket_path, file, process.env.BUCKET_NAME);
            
            //Check the progress of the upload
            upload.on("httpUploadProgress", (progress) => {
                
                const percentage = Math.floor((progress.loaded / progress.total) * 100);
                
                console.log(`${percentage}%`);
                
            });

            try {
                
                await upload.done();

                photo_urls.push(s3_bucket_path);

            } catch (err) {

                console.error('Upload failed:', err);

            }

            complete_upload++;

            if(complete_upload === uploadedFiles.length){

                req.body.links = photo_urls;

                req.body.target_id = parseInt(target_id);

                req.body.target_id_type = target_id_type;

                req.body.user_id = parseInt(user_id);

                //Move onto adding filepaths to the database (add_photo_links.js)
                next();
            }

        });
 
    };
    
};

export default request;
