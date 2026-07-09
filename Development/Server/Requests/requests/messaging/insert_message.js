function request(sql, s3, PutObjectCommand) {

    this.req_path = "/insert_message";
    this.req_type = "post";
    this.callbacks = ["insert_message"];
    
    this.req = async (req, res) => {
        
        let {conversation_id, text, sender_id, created_on} = req.body;

        let query = `
                insert into
                    Private_Messages(conversation_id, text, sender_id, created_on)
                values (?,?,?,?);
            `;

        try {

            await this.sql.query(query, [conversation_id, text, sender_id, created_on]);

            res.json({message: "Successfully inserted the message"});

        } catch(err){

            console.log(query, err);

            res.json({message: "An error occured while inserting the message"});
        }
    };
};

export default request;