function request() {
    
    this.req = (req, res) => {
        
        let {conversation_id, user_email} = req.body;

        let query = `update Conversation_Participants set seen_last = true where conversation_id = ${conversation_id} and user_email = '${user_email}'`;
        
        
        this.sql.query(query, (err, results) => {
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "An error occured while updating seen last"});
            } else {
                res.json({message: "Successfully updated seen last"});
            }
            
            res.end();
        });
       
    };
};

export default request;