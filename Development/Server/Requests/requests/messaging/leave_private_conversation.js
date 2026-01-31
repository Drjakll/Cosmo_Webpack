function request() {

    
    this.req = async (req, res) => {
        
        let {conversation_id, user_id} = req.body;
        
        let query = `delete from Users_In_Private_Conversations where conversation_id = ? and user_id = ?`;
        
        try {

            await this.sql.query(query, [conversation_id, user_id]);

            res.json({message: "You have left the conversation!"});

        } catch(err){

            console.log(query, err);

            res.json({message: "Error leaving the conversation"});
            
        }
    };
};

export default request;