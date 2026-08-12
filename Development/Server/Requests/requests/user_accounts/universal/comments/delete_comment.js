let request = function({sql}) {
    
    this.req_path = "/delete_comment";
    this.req_type = "post";
    this.callbacks = ["central_auth","delete_comment"];
    
    this.req = async (req, res) => { 
        
        let {id} = req.body;

        if(!id){
            return res.status(400).json({message: "Invalid id", failed: true});
        }
 
        let requirements = [id];

        let query = `delete from Comments where id = ?`;
        
        try {

            await sql.query(query, requirements);

            res.status(200).json({message: "Successfully deleted the comment", failed: false});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

