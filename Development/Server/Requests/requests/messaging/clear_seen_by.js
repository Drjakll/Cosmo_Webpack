function request({sql}) {

    this.req_path = "/clear_seen_by";
    this.req_type = "post";
    this.callbacks = ["clear_seen_by"];
    
    this.req = async (req, res) => {
        
        let {conversation_id} = req.body;

        if(!conversation_id){

            return res.status(400).json({message: "Conversation ID not found"});
        }

        let query = `update Users_In_Private_Conversations set seen_last = false where conversation_id = ?`;
        
        try {

            await sql.query(query, [conversation_id]);

            res.status(200).json({message: "Successfully updated seen last to false"});

        } catch(err){

            console.log(query, err);

            res.status(500).json({message: "An error occured while updating seen last"});
        }
       
    };
};

export default request;