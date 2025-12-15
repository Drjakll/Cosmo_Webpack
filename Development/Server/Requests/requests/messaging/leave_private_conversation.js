function request() {

    
    this.req = (req, res) => {
        
        let {conversation_id, user_email} = req.body;
        
        let query = `delete from Conversation_Participants where conversation_id = ${conversation_id} and user_email = '${user_email}'`;
        
        this.sql.query(query, (err, results) => {
        
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: `Error leaving conversation`});
            } else {
                res.json({message: `Successfully left conversation`});
            }

        });
       
    };
};

export default request;