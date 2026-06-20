let request = function() {
    
    this.req_path = "/delete_comment";
    this.req_type = "post";
    this.callbacks = ["delete_comment"];
    
    this.req = async (req, res, next) => { 
        
        let {id, target_id, target_type} = req.body;
 
        let requirements = [id, target_id, target_type]

        let query = `delete from Comments where id = ? and target_id = ? and target_type = ?`;
        
        try {

            await this.sql.query(query, requirements);

            req.body.requirements = [[id], ["comment"]];

            res.json({message: "Successfully deleted the comment", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

