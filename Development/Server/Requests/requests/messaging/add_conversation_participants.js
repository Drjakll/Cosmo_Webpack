function request() {

    this.req_path = "/add_conversation_participants";
    this.req_type = "post";
    this.callbacks = ["add_conversation_participants"];

    this.req = async (req, res) => {
        
        let {new_users, conversation_id} = req.body;

        let now = Date.now();
       
        let query = `insert into Users_In_Private_Conversations(conversation_id, time_joined, user_id, seen_last) values ?`;

        let values = [];

        for(let user_id of new_users){

            values.push([conversation_id, now, user_id, 0]);
        }

        try {


            await this.sql.query(query, [values]);

            res.json({message: "Successfully joined the conversation!", success: true});
            
        } catch(err){

            console.log(query, err);

            res.json({message: "Error joining the conversation", success: false});
        }
    };
};

export default request;