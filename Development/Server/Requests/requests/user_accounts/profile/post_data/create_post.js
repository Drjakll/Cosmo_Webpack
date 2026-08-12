let request = function({sql}) {

    this.req_path = "/create_post";
    this.req_type = "post";
    this.callbacks = ["central_auth","create_post","add_to_feeds"];
    
    this.req = async (req, res, next) => { 
        
        let {body, title} = req.body;

        const {user_id} = req.auth;

        if(isNaN(parseInt(user_id)) || !body || !title){
            res.status(400).json({ message: "Missing required fields", result: null });
            return;
        }

        let created_on = Date.now();

        let data = [title, body, user_id, created_on, created_on];
        
        let query = `insert into Post_Data(title, body, user_id, created_on, last_edited) values (?,?,?,?,?)`;
        
        try {

            let [result] = await sql.query(query, data);

            let post_obj = {id: result.insertId, title, body, user_id, created_on, last_edited: created_on};

            req.body.target_id = post_obj.id;
            req.body.target_id_type = "post_id"; 
            req.body.created_on = created_on;
            req.body.result = post_obj;

            //Should call add_to_feeds.js
            next();

        } catch(err){

            console.log(err);

            res.status(500).json({ message: "Error adding new post", result: null }); 
        }

    };
};

export default request;
