let request = function() {
    
    
    this.req = (req, res) => { 
        
        let {id, user_id} = req.body;
        
        if(!id || !user_id){
            res.json({message: "Error updating album"});
            return;
        }
        
        let query = this.generate_update_query("Photo_Albums", album, {id: id, user_id: user_id});
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error updating album"});
            } else {
                res.json({message: `Successfully updated ${result.affectedRows} row(s)`});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

