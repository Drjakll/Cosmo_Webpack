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

                let {title, body, owner_email} = post_details;

                req.body.owner = {email: post_details.owner_email};
                req.body.alert_data = {title, body, owner_email};
                req.body.type = "post";
                req.body.id_ref = result.insertId;
                req.body.target = "connection_list";

                next();

            }

            
        });

    };
};

export default request;
