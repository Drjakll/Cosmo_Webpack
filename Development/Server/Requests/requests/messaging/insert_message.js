function request({sql}) {

    this.req_path = "/insert_message";
    this.req_type = "post";
    this.callbacks = ["central_auth","insert_message"];
    
    this.req = async (req, res) => {
        
        let {conversation_id, text} = req.body;

        conversation_id = parseInt(conversation_id, 10);

        text = typeof text === "string" ? text.trim() : "";

        if(!conversation_id || isNaN(conversation_id)|| conversation_id <= 0 || typeof text !== "string" || !text.length){
            res.status(400).json({message: "Invalid required fields"});
            return;
        }

        if(text.length > 1000){
            res.status(400).json({message: "Message text is too long"});
            return;
        }

        const {user_id} = req.auth;

        let created_on = Date.now();


        let query = `
                insert into
                    Private_Messages(conversation_id, text, sender_id, created_on)
                select 
                    ?,?,?,? 
                from 
                    Users_In_Private_Conversations 
                where 
                    conversation_id = ? 
                and 
                    user_id = ?
                limit 1;
            `;

        try {

            let [result] = await sql.query(query, [conversation_id, text, user_id, created_on, conversation_id, user_id]);

            if(result.affectedRows === 0){
                res.status(401).json({message: "You are not a participant of this conversation"});
                return;
            }

            res.status(200).json({message: "Successfully inserted the message"});

        } catch(err){

            console.log(query, err);

            res.status(500).json({message: "An error occured while inserting the message"});
        }
    };
};

export default request;