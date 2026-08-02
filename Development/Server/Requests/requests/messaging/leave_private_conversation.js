function request({sql}) {

    this.req_path = "/leave_private_conversation";
    this.req_type = "post";
    this.callbacks = ["central_auth","leave_private_conversation"];
    
    this.req = async (req, res) => {
        
        let {conversation_id} = req.body;
        const {user_id} = req.auth;

        if(!user_id){
            return res.json({message: "Authentication required!"});
        }

        if(!conversation_id){
            return res.json({message: "Missing conversation id"});
        }
        
        let query = `delete 
                        from
                             Users_In_Private_Conversations 
                        where 
                            conversation_id = ? 
                        and 
                            user_id = ?;

                    delete 
                        from 
                            Private_Conversations 
                        where 
                            id = ? 
                        and 
                            not exists 
                            (
                                select 1 
                                    from 
                                        Users_In_Private_Conversations 
                                    where 
                                    conversation_id = ?
                            )`;
        
        try {

            await sql.query(query, [conversation_id, user_id, conversation_id, conversation_id]);

            res.json({message: "You have left the conversation!"});

        } catch(err){

            console.log(query, err);

            res.json({message: "Error leaving the conversation"});
            
        }
    };
};

export default request;