let request = function() {
    
    this.req = (req, res) => { 
        
        let post_details = req.body;
        
        let query = this.generate_insert_query("Post_Data", 
                                                post_details);
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error adding new post"});
            } else {
                res.json({message: "New post added"});
            }
            
            res.end();
            
        });

    };
};

export default request;
