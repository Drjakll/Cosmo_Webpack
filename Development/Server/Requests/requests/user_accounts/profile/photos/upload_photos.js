import fs from 'fs';


let request = function(){
    
    var upload_file = async (path_name, data, bucket_name) => {

        let input = {
            "Body": data,
            "Bucket": bucket_name,
            "Key": path_name
        };

        return this.s3.upload(input)
    };
    
    this.req = async (req, res, next)=>{
        
        
        const uploadedFiles = req.files;
        const {user_id, target_type, target_id, album_name} = JSON.parse(req.body.metadata);

        
        if (!uploadedFiles || uploadedFiles.length === 0 || !target_type || !target_id || !user_id) {
    
            return res.status(400).json({message: 'No files uploaded.'});
        }
        
        let photo_urls = [];
        let complete_upload = 0;
        
        //Go through each file
        await uploadedFiles.forEach(async (file) => {
            
            const tempPath = file.path;
            
            var file_data = fs.createReadStream(tempPath);
            const s3_bucket_path = `users/${user_id}/${target_type}/${album_name}/${file.originalname}`;
            
            const { BucketName } = this.global_data;
            
            let upload = await upload_file(s3_bucket_path, file_data, BucketName);
            
            //Check the progress of the upload
            upload.on("httpUploadProgress", (progress) => {
                
                const percentage = Math.floor((progress.loaded / progress.total) * 100);
                
                console.log(`${percentage}%`);
                
            });

            //Check for completion or error
            upload.send((err, data)=>{

                complete_upload++;

                if(err){

                    console.log(err);

                } else {

                    //If no error, push the path to the photo_urls array
                    photo_urls.push(s3_bucket_path);
                    console.log(`Successfully uploaded to location: ${data.Location}`);
                    
                }

                //If every file has completed/failed upload, then procceed
                if(complete_upload === uploadedFiles.length){
                    
                    req.body.links = photo_urls;

                    req.body.target_id = parseInt(target_id);

                    req.body.target_type = target_type;

                    req.body.user_id = parseInt(user_id);

                    //Move onto adding filepaths to the database (add_photo_links.js)
                    next();
                    
                }
            })
            
            fs.unlink(tempPath, (err) => {
                if(err) {
                    console.error('Error removing file:', err);
                }
            });
        });
 
    };
    
};

export default request;
