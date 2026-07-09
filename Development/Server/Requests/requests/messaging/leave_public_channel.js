function request(sql, s3, PutObjectCommand) {

    this.req_path = "/leave_public_channel";
    this.req_type = "post";
    this.callbacks = ["leave_public_channel"];
    
    this.req = async (req, res) => {
        
        let {public_channel_id, user_id} = req.body;

        let data = [user_id, public_channel_id];

        let query = `delete from 
                        Users_In_Public_Channels
                    where 
                        user_id = ? and
                        public_channel_id = ?;
                    `;

        try {
            await this.sql.query(query, data);

            res.json({message: "Successfully left the channel"});

        }catch(err){

            console.log(query, err);

            res.json({message: "Error leaving the channel"});
        }   
       
    };
};

export default request;