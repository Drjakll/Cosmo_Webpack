function request(sql, s3, PutObjectCommand) {

    this.req_path = "/create_conversation";
    this.req_type = "post";
    this.callbacks = ["create_conversation"];

    this.req = async (req,res, next)=>{

        let {from_id, oppose_id} = req.body;

        let now = Date.now(); 

        let query = `insert into Private_Conversations(chat_type, created_on) values(?,?)`;

        try {
            
            let [result] = await this.sql.query(query, ['group', now]);

            let {insertId} = result;

            req.body.conversation_id = insertId

            req.body.new_users = [from_id, oppose_id];

            //Should call add_conversation_participants.js
            next();

        } catch(err){

            console.log(query, err);

            res.json({message: "Error creating the conversation", success: false});
        }
    }
};

export default request;