let request = function() {
    
    
    this.req = async (req, res, next) => { 
        
        let {id, user_id} = req.body;
        
        if(!id || !user_id){
            console.log("id or user_id is invalid");
            res.end();
            return;
        }

        let requirements = [id, user_id];
        
        let query = `delete from Photo_Albums where id = ? and user_id = ?`;
        
        try {

            await this.sql.query(query, requirements);

            req.body.target_id = id;
            req.body.target_type = "album";

            next();

        } catch(err){

            console.log(err, query);

            res.json({message: "Album failed to delete!"});

        }

        
                
    };
};

export default request;

