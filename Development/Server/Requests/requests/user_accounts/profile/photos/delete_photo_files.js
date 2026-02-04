let request = function(){
    
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
        
        let { BucketName } = this.global_data;
       
        for(let i in photos){
            
            target_type = photos[i].target_type;
            album_id = photos[i].target_id;
            await delete_files(photos[i].link, BucketName);
            
        }
        
        //If it's an album type, then log the change on add_album_update_log.js for feeds display
        if(target_type === "album"){

            req.body.album_id = parseInt(album_id);
            req.body.change_type = "remove";

            let changes = "";

            for(let i in photos){
                changes = `${photos[i].link},`
            }

            changes = changes.slice(0,-1);

            req.body.changes = changes;

            //It should call all_album_update_log.js
            next();

            return;
        }
        
        res.json({message: `Successfully deleted ${Object.keys(photos).length} files`});
        res.end();
 
    };
    
};

export default request;


