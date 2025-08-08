import formidable from 'formidable';
import fs from 'fs';


let request = function(){
    
    var delete_files = async (path_name, bucket_name) => {

        let input = {
            "Bucket": bucket_name,
            "Key": path_name
        };

        await this.s3.deleteObject(input).promise();
    };
    
    this.req = async (req, res)=>{
        
        let { photos } = req.body;
        
        if(Object.keys(photos).length === 0){
            res.json({message: "No files deleted"});
            res.end();
            return;
        }
        
        let { BucketName } = this.global_data;
       
        for(let i in photos){
            
            await delete_files(photos[i].link, BucketName);
            
        }
        
        
        res.json({message: `Successfully deleted ${Object.keys(photos).length} files`});
        res.end();
 
    };
    
};

export default request;


