let request = function() {
    
    
    this.req = (req, res) => { 
        
        let comment_info = req.body;
 
        
        let query = this.generate_update_query("Photo_Comments", comment_info, {id: comment_info.id});
        
        this.sql.query(query, (err, result)=>{
           
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

