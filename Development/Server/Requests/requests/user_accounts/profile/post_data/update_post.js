let request = function() {
    
    this.req = (req, res) => { 
        
        let post_details = req.body;
        
        delete post_details.date_created;
        delete post_details.last_edited;
        
        let query = this.generate_update_query("Post_Data", 
                                                post_details,
                                                {
                                                id: post_details.id,
                                                owner_email: post_details.owner_email
                                                });
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error editing post"});
            } else if (result.affectedRows === 0){
                res.json({message: "No post found"});
            } else {
                res.json({message: "Post updated"});
            }
            
            res.end();
            
        });

    };
};

export default request;
