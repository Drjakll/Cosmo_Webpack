let request = function(sql, s3, PutObjectCommand, DeleteObjectsCommand) {

    this.req_path = "/delete_photo_files";
    this.req_type = "post";
    this.callbacks = ["delete_photo_files"];
    
    var delete_files = async (photos, bucket_name) => {

        let input = {
            "Bucket": bucket_name,
            "Delete": {
                "Objects": Object.keys(photos).map((i) => ({ "Key": photos[i].link })),
                "Quiet": false
            }
        };

        await s3.send(new DeleteObjectsCommand(input));
    };
    
    this.req = async (req, res, next)=>{
        
        let { photos } = req.body;
        
        if(Object.keys(photos || {}).length === 0){
            res.json({message: "No files deleted"});
            return;
        }
        
        let BucketName = process.env.BUCKET_NAME;
       

        await delete_files(photos, BucketName);

        
        res.json({message: `Successfully deleted ${Object.keys(photos).length} files`});
        res.end();
 
    };
    
};

export default request;


