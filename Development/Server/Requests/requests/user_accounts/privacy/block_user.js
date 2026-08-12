function request({sql}){

    this.req_path = "/block_user";
    this.req_type = "post";
    this.callbacks = ['central_auth','block_user', 'add_block_user_reason'];

    this.req = async (req, res, next) => {

        const {target_id, blocked_features} = req.body;
        const {user_id} = req.auth;

        if(!user_id || !target_id){
            return res.status(400).json({message: "Invalid user id and/or target id"});
        }

        const query = `insert into Blocked_Users (user_id, target_id, blocked_features) values(?,?,?)
            as new
            on duplicate key
            update
                blocked_features = new.blocked_features
        `;

        try {
            
            const [result] = await sql.query(query, [user_id, target_id, blocked_features]);

            next();

        }catch(err){

            console.log(err);

            res.status(500).json({message: "Error while adding block user"});

        }
    };

}

export default request;