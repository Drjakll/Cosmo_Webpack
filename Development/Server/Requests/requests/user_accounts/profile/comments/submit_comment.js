let request = function() {
    
    
    this.req = (req, res) => { 
        
        let {target_id, target_type, comment} = req.body;
 
        let data = [
            {target_id, target_type, comment}
        ]
        
        let query = `insert into Comments (target_id, target_type, comment) values ?`;
        
        this.sql.query(query, data, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error submitting comment"});
            } else {
                res.json({message: `Successfully submitted comment`});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

