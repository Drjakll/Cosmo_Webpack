function request() {

    this.req = (req, res)=>{

        let {conversation_id} = req.body;

        let query = `delete from Conversations where id = ${conversation_id}`

        this.sql.query(query, (err, result)=>{

            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error deleting conversation"});
            } else {
                res.json({message: "Successfully deleted the conversation"});
            }

            res.end();

        });
    };
};

export default request;