let request = function() {
    
    
    this.req = (req, res) => { 
        
        let photo_info = req.body;
 
        
        let query = `select * from Photo_Comments where belongs_to_photo_id = ${photo_info.id}`;
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error retrieving comments", photo_comments: []});
            } else {
                res.json({message: `Successfully retrieved ${result.length} comments`, photo_comments: result});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

