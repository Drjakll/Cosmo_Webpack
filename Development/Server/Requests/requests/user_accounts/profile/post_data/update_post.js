let request = function() {
    
    this.req = (req, res, next) => { 
        
        let post_details = req.body;
   
        post_details.last_edited = Date.now();
        
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
                res.end();

            } else if (result.affectedRows === 0){

                res.json({message: "No post found"});
                res.end();

            } else {

                let {title, body, id, date_created, owner_email} = post_details;
                
                req.body.type = "post";
                req.body.data = {title, body, date_created, owner_email};
                req.body.type_id = id;
                req.body.news_id = null;
                req.body.message = "";

                next();
            }
            
        });

    };
};

export default request;
