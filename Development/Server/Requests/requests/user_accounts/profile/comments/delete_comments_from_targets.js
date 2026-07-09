let request = function(sql, s3, PutObjectCommand) {
    
    this.req_path = "/delete_comments_from_targets";
    this.req_type = "post";
    this.callbacks = ["delete_comments_from_targets"];
    
    //Deleting comments from multiple targets
    this.req = async (req, res, next) => { 
        
        let {target_ids, target_id_type} = req.body;

        let query = `delete from Comments where ${target_id_type} in (?)`;
        
        try {

            await this.sql.query(query, [target_ids]);

            res.json({message: "Successfully deleted comments", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

