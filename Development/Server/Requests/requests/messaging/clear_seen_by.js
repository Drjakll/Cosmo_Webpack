function request() {
    
    this.req = (req, res) => {
        
        let {conversation_id} = req.body;

        let query = `update Conversation_Participants set seen_last = false where conversation_id = ${conversation_id}`;
        
        
        this.sql.query(query, (err, results) => {
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "An error occured while updating seen last"});
            } else {
                res.json({message: "Successfully updated seen last to false"});
            }
            
            res.end();
        });
       
    };
};

export default request;