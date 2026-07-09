function request(sql, s3, PutObjectCommand) {
    
    this.req_path = "/join_public_channel";
    this.req_type = "post";
    this.callbacks = ["join_public_channel"];

    this.req = async (req, res) => {
        
        let {public_channel_id, user_id} = req.body;

        let now = Date.now();

        let data = [user_id, public_channel_id, now];

        let query = `
                insert into 
                    Users_In_Public_Channels(user_id, public_channel_id, joined_time)
                values (?, ?, ?)
                `;

        try {

            await this.sql.query(query, data);

            res.json({message: "Successfully joined the channel"});

        }catch(err){

            console.log(query, err);

            res.json({message: "Error joining channel"});
        }
    }

};

export default request;