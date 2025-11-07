function request() {
    
    this.req = (req, res) => {
        
        let {initiator_email, oppose_email} = req.body;

        let time_joined = Date.now();

        let data_to_insert = {
            users: [{email: initiator_email, time_joined}, {email: oppose_email, time_joined}],
            messages: [],
            room_tag: `${initiator_email}${oppose_email}${Date.now()}`
        };
        
        let query = this.generate_insert_query("Messaging", data_to_insert);
        
        this.sql.query(query, (err, results) => {
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "An error occured, cannot create conversation.", room_tag: null});
            } else {
                res.json({message: "Successfully created conversation", room_tag: data_to_insert.room_tag});
            }

            res.end();
        });
       
    };
};

export default request;