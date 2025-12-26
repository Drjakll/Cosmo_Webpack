let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {id, user_id} = req.body;
        
        if(!id || !user_id){
            console.log("id or user_id is invalid");
            res.end();
            return;
        }
        
        let query = `delete from Photo_Albums where id = ${id} and user = ${user_id}`;
        
        try {

            await this.sql.query(query);

        } catch(err){

            console.log(err, query);

        }

        res.end();
                
    };
};

export default request;

