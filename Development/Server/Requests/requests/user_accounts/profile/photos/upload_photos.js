import formidable from 'formidable';
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
    
    this.req = async (req, res)=>{
        
        
        const uploadedFiles = req.files;
        const {email, album} = JSON.parse(req.body.metadata);

        
        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({message: 'No files uploaded.'});
        }
        
        let photo_urls = [];
        let complete_upload = 0
        
        await uploadedFiles.forEach(async (file) => {
            const tempPath = file.path;
            const s3_bucket_path = `users/${email.toLowerCase()}/${album}/${file.originalname}`;
            
            photo_urls.push(s3_bucket_path);
            
            var file_data = await fs.createReadStream(tempPath);
            const fileSize = fs.statSync(tempPath).size;
            
            const { BucketName } = this.global_data;
            
            let upload = await upload_file(s3_bucket_path, file_data, BucketName);
            
            upload.on("httpUploadProgress", (progress) => {
                
                const percentage = ((progress.loaded / fileSize) * 100).toFixed(2);
                
                if(percentage >= 100){
                    complete_upload++;
                    
                    if(complete_upload === uploadedFiles.length){
                        res.json({message: 'Files uploaded successfully', photo_urls: photo_urls});
                        res.end();
                    }
                }
                
            });
            
            await upload.promise();
            
            fs.unlink(tempPath, (err) => {
                if(err) {
                    console.error('Error removing file:', err);
                }
            });
        });
 
    };
    
};

export default request;
