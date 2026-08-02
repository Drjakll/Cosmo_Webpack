function request({sql}) {

    this.req_path = "/insert_message";
    this.req_type = "post";
    this.callbacks = ["central_auth","insert_message"];
    
    this.req = async (req, res) => {
        
        let {conversation_id, text, sender_id, created_on} = req.body;

        const {user_id} = req.auth;

        if(sender_id !== user_id){
            return res.json({message: "Authentication error"});
        }

        let query = `
                insert into
                    Private_Messages(conversation_id, text, sender_id, created_on)
                values (?,?,?,?);
            `;

        try {

            await sql.query(query, [conversation_id, text, sender_id, created_on]);

            res.json({message: "Successfully inserted the message"});

        } catch(err){

            console.log(query, err);

            res.json({message: "An error occured while inserting the message"});
        }
    };
};

export default request;