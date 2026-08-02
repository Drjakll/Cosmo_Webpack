let request = function ({sql}) {

    this.req_path = "/remove_follower";
    this.req_type = "post";
    this.callbacks = ["central_auth","remove_follower"];

    this.req = async (req, res)=>{

        let { follower_id, followed_id} = req.body;
        const {user_id} = req.auth;


        if(!follower_id || !followed_id || isNaN(parseInt(follower_id)) || isNaN(parseInt(followed_id))){
            res.json({message: "Missing required fields!"});
            return;
        }

        if(user_id !== followed_id){
            res.json({message: "You are not authorized to remove this follower!"});
            return;
        }
        
        let now = Date.now();

        let data = [follower_id, followed_id];

        let query = `
            update Connections set status = 'rejected' , timestamp = ${now} where follower_id = ? and followed_id = ?;
        `;

        try {

            sql.query(query, data);

            res.json({message:"Successfully removed follower"});

        } catch(err){

            console.log(err);

            res.json({message: "Error removing follower"});
        }

    };
};

export default request;