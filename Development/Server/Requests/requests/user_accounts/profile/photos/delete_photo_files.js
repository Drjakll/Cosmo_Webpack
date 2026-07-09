let request = function(sql, s3, PutObjectCommand){

    this.req_path = "/delete_photo_files";
    this.req_type = "post";
    this.callbacks = ["delete_photo_files"];
    
    var delete_files = async (path_name, bucket_name) => {

        let input = {
            "Bucket": bucket_name,
            "Key": path_name
        };

        await this.s3.deleteObject(input).promise();
    };
    
    this.req = async (req, res, next)=>{
        
        let { photos } = req.body;
        
        if(Object.keys(photos || {}).length === 0){
            res.json({message: "No files deleted"});
            return;
        }
        
        let target_type = "";
        let album_id = "";
        
        let BucketName = process.env.BUCKET_NAME;
       
        for(let i in photos){
            
            target_type = photos[i].target_type;
            album_id = photos[i].target_id;
            await delete_files(photos[i].link, BucketName);
            
        }
        
        res.json({message: `Successfully deleted ${Object.keys(photos).length} files`});
        res.end();
 
    };
    
};

export default request;


