let request = function() {
    
    
    this.req = (req, res) => { 
        
        let post_info = req.body;
 
        
        let query = `select * from Post_Comments where belongs_to_post_id = ${post_info.id}`;
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error retrieving comments", post_comments: []});
            } else {
                res.json({message: `Successfully retrieved ${result.length} comments`, post_comments: result});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

