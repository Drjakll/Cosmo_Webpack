let request = function({sql}) {
    
    this.req_path = "/delete_comment";
    this.req_type = "post";
    this.callbacks = ["central_auth","delete_comment"];
    
    this.req = async (req, res) => { 
        
        let {id} = req.body;
 
        let requirements = [id];

        let query = `delete from Comments where id = ?`;
        
        try {

            await sql.query(query, requirements);

            res.json({message: "Successfully deleted the comment", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

