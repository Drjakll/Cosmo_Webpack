let request = function({sql}) {
    
    this.req_path = "/update_comment";
    this.req_type = "patch";
    this.callbacks = ["central_auth","update_comment"];

    const available_target_id_types = ["post_id", "photo_id", "wall_id", "reply_to_id"];
    
    this.req = async (req, res) => { 
        
        let {comment, id, target_id_type, target_id} = req.body;

        if(!available_target_id_types.includes(target_id_type)){
            res.json({message: "Invalid target ID type", failed: true});
            return;
        }

        const {user_id} = req.auth;

        let data = { comment, last_updated: Date.now()};
 
        let query = `update Comments set ? where id = ? and ${target_id_type} = ? and user_id = ?`;


        try {

            await sql.query(query, [data, id, target_id, user_id] );

            res.json({message: "Successfully updated the comment", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error updating the comment", failed: true});

        }        
    };
};

export default request;

