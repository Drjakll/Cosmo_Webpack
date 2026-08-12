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
                res.status(404).json({message: "No post found"});
            } else {
                res.status(200).json({message: "Successfully updated post"});
            }


        } catch(err){
            console.log(err);
            res.status(500).json({message: "Error editing post"});
        }

    };
};

export default request;
