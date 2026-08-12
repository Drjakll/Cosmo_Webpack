function request({sql}) {

    this.req_path = "/add_conversation_participants";
    this.req_type = "post";
    this.callbacks = ["central_auth","add_conversation_participants"];

    this.req = async (req, res) => {
        
        let {new_users, conversation_id} = req.body;

        if(!conversation_id){

            return res.status(400).json({message: "Conversation ID not found"});
        }

        let now = Date.now();
       
        let query = `insert into Users_In_Private_Conversations(conversation_id, time_joined, user_id, seen_last) values ?`;

        let values = [];

        for(let user_id of new_users){

            values.push([conversation_id, now, user_id, 0]);
        }

        try {


            await sql.query(query, [values]);

            res.status(200).json({message: "Successfully joined the conversation!", success: true});
            
        } catch(err){

            console.log(query, err);

            res.status(500).json({message: "Error joining the conversation", success: false});
        }
    };
};

export default request;