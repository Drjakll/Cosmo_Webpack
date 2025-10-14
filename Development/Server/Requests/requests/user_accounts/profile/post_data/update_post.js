let request = function() {
    
    this.req = (req, res, next) => { 
        
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
                res.end();

            } else if (result.affectedRows === 0){

                res.json({message: "No post found"});
                res.end();

            } else {

                let {title, body, id} = post_details;
                
                req.body.type = "post";
                req.body.data = {title, body};
                req.body.type_id = id;
                req.body.alert_id = null;

                next();
            }
            
        });

    };
};

export default request;
