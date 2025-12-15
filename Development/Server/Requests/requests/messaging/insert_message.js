function request() {
    
    this.req = (req, res) => {
        
        let {conversation_id, text, sender_email, timestamp} = req.body;

        text = text.replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"');

        let query = `
            insert into
                Message_Index(conversation_id, text, sender_email, created_on)
            values (${conversation_id}, '${text}', '${sender_email}', ${timestamp});`;

        this.sql.query(query, (err, result) => {
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "An error occured while inserting the message"});
            } else {
                res.json({message: "Successfully inserted the message"});
            }

        });
       
    };
};

export default request;