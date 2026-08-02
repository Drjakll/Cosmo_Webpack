function request({sql}){

    this.req_path = "/get_blocked_users";
    this.req_type = "post";
    this.callbacks = ['central_auth','get_blocked_users'];

    this.req = async (req, res) => {

        const {target_id} = req.body;

        const {user_id} = req.auth;

        if(!user_id){
            return res.json({message: "Invalid user id", blocked_users: []});
        }

        let data = target_id ? [user_id, target_id] : [user_id];

        const query = `select * from Blocked_Users where user_id = ? ${target_id ? "and target_id = ?" : ""}`;

        try {
            
            const [results] = await sql.query(query, data);

            res.json({message: "Successfully retrieved " + results.length + " blocked users", blocked_users: results});

        }catch(err){

            console.log(err);

            res.json({message: "Error while adding block user"});

        }
    };

}

export default request;