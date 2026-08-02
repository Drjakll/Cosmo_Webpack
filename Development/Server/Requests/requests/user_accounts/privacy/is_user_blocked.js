function request({sql}){

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];

    let id_type_alias = {
        post_id: "posts",
        wall_id: "wall",
        photo_id: "photos",
    };

    this.req = async (req, res, next) => {

        const {user_id, commenter_user_id, owner_user_id, target_id_type, from_id, oppose_id, target_id, viewer_id} = req.body;
        

        if((!commenter_user_id && !from_id && !target_id) || 
            (!owner_user_id && !oppose_id && !viewer_id)){
            return res.json({message: "Invalid user id and/or target user id", blocked: true});
        }

        let data = [owner_user_id ?? oppose_id ?? target_id, commenter_user_id ?? from_id ?? viewer_id];

        const query = `select * from Blocked_Users where user_id = ? and target_id = ?`;

        try {
            
            const [results] = await sql.query(query, data);


            let {blocked_features} = results.length ? results[0] : {blocked_features: ""};

            let blocked_features_array = blocked_features?.split(',') ?? [];


            //Only private messages would have the object name from_id and oppose_id
            const is_private_messages = from_id && oppose_id;

            //Only profile view request would have the object name viewer_id and target_id
            const is_profile_view = viewer_id && target_id;

            const blocked_feature_type = is_private_messages ? "private_messages" : (is_profile_view ? "profile_view" : id_type_alias[target_id_type]);

            const msg = is_private_messages ? 
                                "You've been blocked from inviting this user to private messages" : 
                                (is_profile_view ? "You've been blocked from viewing this user's profile" : 
                                    "You've been blocked from writing messages on the user's " + blocked_feature_type);

            if(blocked_features_array.includes(blocked_feature_type)){

                res.json({message: msg, blocked: true});
                return;

            } 

            //Possible routes: view_user_account_data.js, submit_comment.js, update_comment.js 
            next();

        }catch(err){

            console.log(err);

            res.json({message: "Error checking to see if user is blocked", blocked: true});

        }
    };

}

export default request;