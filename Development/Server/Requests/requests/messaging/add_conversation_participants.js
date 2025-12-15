function request() {
    
    this.req = (req, res) => {
        
        let {new_users} = req.body;

        if(new_users.length === 0){
            res.json({message: "Successfully finished!"});
            return;
        }

        let insert_data = [];

        let now = Date.now();

        for(let user of new_users){

            let {user_email, conversation_id} = user;

            insert_data.push([user_email, conversation_id, now]);
        }
        
        let query = `insert into Conversation_Participants(user_email, conversation_id, time_joined) values ?`;
        
        this.sql.query(query, [insert_data], (err, results) => {
            
            if(err){
                console.log(query, err.sqlMessage);
            }
    
        });

        res.json({message: "Successfully finished!"});
       
    };
};

export default request;