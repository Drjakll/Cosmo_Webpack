let request = function({s3, DeleteObjectsCommand}) {

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];
    
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
    
    this.req = async (req, res)=>{
        
        let { photos } = req.body;
        
        if(Object.keys(photos || {}).length === 0){
            res.status(400).json({message: "No files deleted"});
            return;
        }
        
        let BucketName = process.env.BUCKET_NAME;
       

        await delete_files(photos, BucketName);

        
        res.status(200).json({message: `Successfully deleted ${Object.keys(photos).length} files`});
 
    };
    
};

export default request;


