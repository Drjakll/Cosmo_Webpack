function request({sql}) {

    this.req_path = "/edit_private_conversation_name";
    this.req_type = "patch";
    this.callbacks = ["central_auth","edit_private_conversation_name"];

    this.req = async (req, res) => {
        
        let {conversation_id, conversation_name} = req.body;
        const {user_id} = req.auth;

        if(!user_id){
            return res.json({message: "Authentication required!"});
        }

        let query = `update Users_In_Private_Conversations set conversation_name = ? where user_id = ? and conversation_id = ?`;

        try {

            await sql.query(query, [conversation_name, user_id, conversation_id]);

            res.json({message: "Successfully updated the conversation name."});
            
        } catch(err){

            console.log(query, err);

            res.json({message: "Error updating the conversation name!"});
        }
    };
};

export default request;