function request({sql}){

    this.req_path = "/get_blocked_users_reasons";
    this.req_type = "post";
    this.callbacks = ['get_blocked_users_reasons'];

    this.req = async (req, res, next) => {

        const {user_id, target_id, blocked_users} = req.body;

        if(!user_id){
            return res.json({message: "Invalid user id"});
        }

        let data = target_id ? [user_id, target_id] : [user_id];

        const query = `select * from Blocked_Users_Reasons where user_id = ? ${target_id ? "and target_id = ?" : ""}`;

        try {
            
            const [results] = await sql.query(query, data);

            let blocked_users = {};

            for(let result of results){

                let {target_id, reason, blocked_feature, last_modified} = result;

                blocked_users[target_id] = blocked_users[target_id] ?? {};

                blocked_users[target_id][blocked_feature] = {reason, last_modified};
            }

            /*
                Example of blocked_users:

                blocked_users = {
                    1: {
                        "wall": {reason: "spam", last_modified: 2098573954},
                        "photos": {reason: "spam", last_modified: 2098573954}
                    },
                    2: {
                        "posts": {reason: "annoying", last_modified: 2098573954},
                        "photos": {reason: "very rude", last_modified: 2098573954},
                        "private_messages": {reason: "harrassment", last_modified: 2098573954}
                    }
                }
            */

            res.json({message: "Successfully retrieved blocked users", blocked_users});

        }catch(err){

            console.log(err);

            res.json({message: "Error while adding block user"});

        }
    };

}

export default request;