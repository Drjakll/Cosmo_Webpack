let request = function() {
    
    this.req_path = "/delete_multiple_comments";
    this.req_type = "post";
    this.callbacks = ["delete_multiple_comments"];
    
    this.req = async (req, res) => { 
        
        let {requirements} = req.body;

        if((requirements && requirements[0]).length === 0){
            res.json({message:"No comments to delete", failed: true});
            return;
        }

        let query = `delete from Comments where id in (?)`;
        
        try {

            await this.sql.query(query, requirements);

            res.json({message: "Successfully deleted comments", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

