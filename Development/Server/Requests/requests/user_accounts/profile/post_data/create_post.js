let request = function() {
    
    this.req = (req, res, next) => { 
        
        let post_details = req.body;
        
        let query = this.generate_insert_query("Post_Data", 
                                                post_details);
        
        this.sql.query(query, (err, result)=>{
            
            if (err) {

                console.log(query, err.sqlMessage);
                res.json({ message: "Error adding new post" });            
                res.end();

            } else {

                let {body, title, owner_email, date_created, last_edited} = post_details;

                req.body.owner = {email: owner_email};
                req.body.news_data = {id: result.insertId, body, title, owner_email, date_created, last_edited};
                req.body.type = "post";
                req.body.id_ref = result.insertId;
                req.body.message = "";

                next();

            }

            
        });

    };
};

export default request;
