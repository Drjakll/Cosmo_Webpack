let request = function() {
    
    
    this.req = (req, res) => { 
        
        let comment_info = req.body;
 
        
        let query = `delete from Post_Comments where id = ${comment_info.id}`;
        
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

