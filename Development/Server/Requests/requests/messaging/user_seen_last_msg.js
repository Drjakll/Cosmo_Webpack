function request({sql}) {

    this.req_path = "/user_seen_last_msg";
    this.req_type = "post";
    this.callbacks = ["central_auth","user_seen_last_msg"];
    
    this.req = async (req, res) => {
        
        let {conversation_id} = req.body;

        const {user_id} = req.auth;

        if(!user_id){
            return res.status(400).json({message: "Authentication required!"});
        }

        if(!conversation_id){
            return res.status(400).json({message: "Missing conversation id"});
        }

        let query = `update Users_In_Private_Conversations set seen_last = true where conversation_id = ? and user_id = ?`;
        
        try {

            await sql.query(query, [conversation_id, user_id]);

            res.status(200).json({message: "Successfully updated seen last"});

        } catch(err){

            console.log(query, err);

            res.status(500).json({message: "An error occured while updating seen last"});
        }
       
    };
};

export default request;