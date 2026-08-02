let request = function ({sql}) {

    this.req_path = "/remove_follow_request";
    this.req_type = "post";
    this.callbacks = ["central_auth","remove_follow_request"];

    this.req = async (req, res)=>{

        let { from_id, to_id } = req.body;
        const {user_id} = req.auth;

        if(!from_id || !to_id || isNaN(parseInt(from_id)) || isNaN(parseInt(to_id))){
            res.json({message: "Missing required fields!"});
            return;
        }

        if(user_id !== from_id){
            res.json({message: "You are not authorized to remove this follow request!"});
            return;
        }

        let data = [from_id, to_id];

        let query = `
            delete from Connections where follower_id = ? and followed_id = ?;
        `;

        try {

            sql.query(query, data);

            res.json({message:"Successfully removed follow request"});

        } catch(err){

            console.log(err);

            res.json({message: "Error removing follow request"});
        }

    };
};

export default request;