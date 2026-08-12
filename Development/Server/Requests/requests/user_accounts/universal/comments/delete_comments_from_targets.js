let request = function({sql}) {
    
    //As of 8/8/2026, this isn't being used
    this.req_path = "/delete_comments_from_targets";
    this.req_type = "post";
    this.callbacks = ["central_auth","delete_comments_from_targets"];
    
    //Deleting comments from multiple targets
    this.req = async (req, res, next) => { 
        
        let {target_ids, target_id_type} = req.body;

        let query = `delete from Comments where ${target_id_type} in (?)`;
        
        try {

            await sql.query(query, [target_ids]);

            res.status(200).json({message: "Successfully deleted comments", failed: false});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

