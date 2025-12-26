let request = function() {
    
    
    this.req = (req, res) => { 
        
        let {id, target_id, target_type} = req.body;
 
        
        let query = `delete from Comments where id = ${id} and target_id = ${target_id} and target_type = '${target_type}'`;
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error deleting comment"});
            } else {
                res.json({message: `Successfully deleted comment`});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

