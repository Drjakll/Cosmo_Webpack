let request = function({sql}) {

    this.req_path = "/update_post";
    this.req_type = "post";
    this.callbacks = ["central_auth","update_post"];
    
    this.req = async (req, res) => { 
        
        let {id, title, body} = req.body;

        const {user_id} = req.auth;
        
        let query = `update Post_Data set title = ?, body = ? where id = ? and user_id = ?`;

        let data = [title, body, id, user_id];
        
        try {
            let [result] = await sql.query(query, data);

            if(result.affectedRows === 0){
                res.json({message: "No post found"});
            } else {
                res.json({message: "Successfully updated post"});
            }


        } catch(err){
            console.log(err);
            res.json({message: "Error editing post"});
        }

    };
};

export default request;
