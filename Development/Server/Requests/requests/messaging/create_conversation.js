function request({sql}) {

    this.req_path = "/create_conversation";
    this.req_type = "post";
    this.callbacks = ["central_auth","is_user_blocked","create_conversation","add_conversation_participants"];

    this.req = async (req,res, next)=>{

        
        let {from_id, oppose_id} = req.body;

        let now = Date.now(); 

        let query = `insert into Private_Conversations(chat_type, created_on) values(?,?)`;

        try {
            
            let [result] = await sql.query(query, ['group', now]);

            let {insertId} = result;

            req.body.conversation_id = insertId

            req.body.new_users = [from_id, oppose_id];

            //Should call add_conversation_participants.js
            next();

        } catch(err){

            console.log(query, err);

            res.status(500).json({message: "Error creating the conversation", success: false});
        }
    }
};

export default request;