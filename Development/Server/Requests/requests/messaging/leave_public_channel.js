function request({sql}) {

    this.req_path = "/leave_public_channel";
    this.req_type = "post";
    this.callbacks = ["central_auth","leave_public_channel"];
    
    this.req = async (req, res) => {
        
        let {public_channel_id} = req.body;

        const {user_id} = req.auth;

        let data = [user_id, public_channel_id, public_channel_id, public_channel_id];

        let query = `delete from 
                        Users_In_Public_Channels
                    where 
                        user_id = ? and
                        public_channel_id = ?;

                    delete from 
                        Public_Channels
                    where
                        id = ? and
                        not exists (
                            select 
                                1
                            from 
                                Users_In_Public_Channels
                            where 
                                public_channel_id = ?
                        )
                    `;

        try {
            await sql.query(query, data);

            res.json({message: "Successfully left the channel"});

        }catch(err){

            console.log(query, err);

            res.json({message: "Error leaving the channel"});
        }   
       
    };
};

export default request;