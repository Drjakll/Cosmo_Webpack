let request = function ({sql}) {

    this.req_path = "/remove_follow_request";
    this.req_type = "post";
    this.callbacks = ["central_auth","remove_follow_request"];

    this.req = async (req, res)=>{

        let { to_id } = req.body;
        const {user_id} = req.auth;

        to_id = parseInt(to_id);

        if(!to_id || isNaN(to_id)){
            res.status(404).json({message: "Missing required fields!"});
            return;
        }

        let data = [user_id, to_id];

        let query = `
            delete from Connections where follower_id = ? and followed_id = ?;
        `;

        try {

            let [result] = await sql.query(query, data);

            if(result.affectedRows === 0){
                res.status(404).json({message: "Follow request not found"});
                return;
            }

            res.json({message:"Successfully removed follow request"});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error removing follow request"});
        }

    };
};

export default request;