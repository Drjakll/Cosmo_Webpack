let request = function() {
    
    this.req = (req, res, next) => { 
        
        let post_details = req.body;
        
        let query = this.generate_insert_query("Post_Data", 
                                                post_details);
        
        this.sql.query(query, (err, result)=>{
            
            if (err) {

                console.log(err.sqlMessage);
                res.json({ message: "Error adding new post" });            
                res.end();

            } else {

                let {title, body, owner_email, date_created} = post_details;

                req.body.owner = {email: owner_email};
                req.body.news_data = {title, body, owner_email, date_created};
                req.body.type = "post";
                req.body.id_ref = result.insertId;
                req.body.message = "";

                next();

            }

            
        });

    };
};

export default request;
