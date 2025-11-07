function request() {
    
    this.req = (req, res) => {
        
        let {users, room_tag, messages, seen_by} = req.body;

        let data_to_update = {
            messages: messages,
            users: users,
            seen_by: seen_by || {}
        };

        let requirements = {
            room_tag: room_tag
        };
        
        let query = this.generate_update_query("Messaging", data_to_update, requirements);
        
        this.sql.query(query, (err, results) => {
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "An error occured while updating conversation"});
            } else {
                res.json({message: "Successfully updated conversation"});
            }
            
            res.end();
        });
       
    };
};

export default request;