let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/create_post";
    this.req_type = "post";
    this.callbacks = ["create_post","add_to_feeds"];
    
    this.req = async (req, res, next) => { 
        
        let {user_id, body, title} = req.body;

        if(isNaN(parseInt(user_id)) || !body || !title){
            res.json({ message: "Missing required fields", result: null });
            return;
        }

        let created_on = Date.now();

        let data = [title, body, user_id, created_on, created_on];
        
        let query = `insert into Post_Data(title, body, user_id, created_on, last_edited) values (?,?,?,?,?)`;
        
        try {

            let [result] = await this.sql.query(query, data);

            let post_obj = {id: result.insertId, title, body, user_id, created_on, last_edited: created_on};

            req.body.target_id = post_obj.id;
            req.body.target_id_type = "post_id"; 
            req.body.created_on = created_on;
            req.body.result = post_obj;

            //Should call add_to_feeds.js
            next();

        } catch(err){

            console.log(err);

            res.json({ message: "Error adding new post", result: null }); 
        }

    };
};

export default request;
