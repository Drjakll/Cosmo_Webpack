function request({sql}) {

    this.req_path = "/user_seen_last_msg";
    this.req_type = "post";
    this.callbacks = ["user_seen_last_msg"];
    
    this.req = async (req, res) => {
        
        let {conversation_id, user_id} = req.body;

        let query = `update Users_In_Private_Conversations set seen_last = true where conversation_id = ? and user_id = ?`;
        
        try {

            await sql.query(query, [conversation_id, user_id]);

            res.json({message: "Successfully updated seen last"});

        } catch(err){

            console.log(query, err);

            res.json({message: "An error occured while updating seen last"});
        }
       
    };
};

export default request;