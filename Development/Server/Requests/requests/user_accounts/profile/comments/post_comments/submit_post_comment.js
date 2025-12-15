let request = function() {
    
    
    this.req = (req, res) => { 
        
        let comment_info = req.body;
 
        
        let query = this.generate_insert_query("Post_Comments", comment_info);
        
        this.sql.query(query, (err, result)=>{
           
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

