function request() {

    this.req = async (req, res)=>{

        let {conversation_id} = req.body;

        let query = `delete from Private_Conversations where id = ?`

        try {
            
            await this.sql.query(query, [conversation_id]);

            res.json({message: "Successfully deleted the conversation"});

        }catch(err){

            console.log(query, err);

            res.json({message: "Error deleting the conversation"});
        }
    };
};

export default request;