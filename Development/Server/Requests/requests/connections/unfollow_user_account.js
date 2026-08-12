let request = function ({sql}) {

    this.req_path = "/unfollow_user_account";
    this.req_type = "post";
    this.callbacks = ["central_auth","unfollow_user_account"];

    this.req = async (req, res)=>{

        let { followed_id, follower_id } = req.body;
        const {user_id} = req.auth;

        if(!followed_id || !follower_id || isNaN(parseInt(followed_id)) || isNaN(parseInt(follower_id))){
            res.status(400).json({message: "Missing required fields!"});
            return;
        }

        if(user_id !== follower_id){
            res.status(401).json({message: "You are not authorized to unfollow this user!"});
            return;
        }

        let now = Date.now();

        let data = [follower_id, followed_id];

        let query = `
            update Connections set status = 'rejected' , timestamp = ${now} where follower_id = ? and followed_id = ?;
        `;

        try {

            await sql.query(query, data);

            res.status(200).json({message: "Successfully unfollowed user"});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error following user"});

        }

    };
};

export default request;