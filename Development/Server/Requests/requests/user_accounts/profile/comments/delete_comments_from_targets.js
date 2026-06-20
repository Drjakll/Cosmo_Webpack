let request = function() {
    
    this.req_path = "/delete_comments_from_targets";
    this.req_type = "post";
    this.callbacks = ["delete_comments_from_targets"];
    
    this.req = async (req, res, next) => { 
        
        let {requirements} = req.body;

        let query = `delete from Comments where target_id in (?) and target_type in (?)`;
        
        try {

            await this.sql.query(query, requirements);

            next();

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

