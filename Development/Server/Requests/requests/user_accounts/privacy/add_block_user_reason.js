function request({sql}){

    this.req_path = "/add_block_user_reason";
    this.req_type = "post";
    this.callbacks = ['central_auth','add_block_user_reason'];

    this.req = async (req, res) => {

        const {target_id, blocked_features, reason} = req.body;

        const {user_id} = req.auth;

        if(!user_id || !target_id) {
            return res.json({message: "Invalid user id and/or target id"});
        }

        let last_modified = Date.now();

        let features = blocked_features?.split(',') || [];

        if(!features.length){
            return res.json({message: "No blocked features were given"});
        }

        let to_insert = [];
        let placeholders = [];

        for(const feature of features){
            
            to_insert.push(
                        user_id,
                        target_id,
                        feature,
                        reason,
                        last_modified
                    );

            placeholders.push("(?,?,?,?,?)")
        }


        const query = `insert into Blocked_Users_Reasons (user_id, target_id, blocked_feature, reason, last_modified) 
            values ${placeholders.join(',')}
            as new
            on duplicate key
            update
                reason = new.reason
        `;

        try {
            
            await sql.query(query, to_insert);

            res.json({message: "Successfully blocked user"});

        }catch(err){

            console.log(err);

            res.json({message: "Error while adding block user reason"});

        }
    };

}

export default request;