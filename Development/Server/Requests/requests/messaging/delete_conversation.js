function request({sql}) {

    this.req_path = "/delete_conversation";
    this.req_type = "post";
    this.callbacks = ["delete_conversation"];

    this.req = async (req, res)=>{

        let {conversation_id} = req.body;

        let query = `delete from Private_Conversations where id = ?`

        try {
            
            await sql.query(query, [conversation_id]);

            res.status(200).json({message: "Successfully deleted the conversation"});

        }catch(err){

            console.log(query, err);

            res.status(500).json({message: "Error deleting the conversation"});
        }
    };
};

export default request;