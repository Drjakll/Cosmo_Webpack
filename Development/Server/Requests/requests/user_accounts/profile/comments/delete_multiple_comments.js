let request = function({sql}) {
    
    this.req_path = "/delete_multiple_comments";
    this.req_type = "post";
    this.callbacks = ["central_auth","delete_multiple_comments"];
    
    this.req = async (req, res) => { 
        
        let {comment_ids} = req.body;

        if(comment_ids.length === 0){
            res.json({message:"No comments to delete", failed: true});
            return;
        }

        let query = `delete from Comments where id in (?)`;
        
        try {

            await sql.query(query, comment_ids);

            res.json({message: "Successfully deleted comments", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

