let request = function({sql}) {
    
    this.req_path = "/delete_reactions";
    this.req_type = "post";
    this.callbacks = ["central_auth","delete_reactions"];
    
    this.req = async (req, res, next) => { 
        
        let {requirements} = req.body;

        let query = `delete from General_Reactions where target_id in (?) and target_type in (?)`;
        
        try {

            await sql.query(query, requirements);

            //Should call to delete whatever it needs to delete next, post or photo files
            next();

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

