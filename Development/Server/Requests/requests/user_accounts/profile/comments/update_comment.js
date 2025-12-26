let request = function() {
    
    
    this.req = (req, res) => { 
        
        let {comment, id, target_type, target_id} = req.body;

        let data = [comment, id, target_type, target_id];
 
        let query = `update Comments set comment = ? where id = ? and target_type = ? and target_id = ?`
        
        this.sql.query(query, data, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error editing comment"});
            } else {
                res.json({message: `Successfully edited comment`});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

