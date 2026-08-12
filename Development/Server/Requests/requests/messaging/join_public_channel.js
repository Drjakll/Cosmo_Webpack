function request({sql}) {
    
    this.req_path = "/join_public_channel";
    this.req_type = "post";
    this.callbacks = ["central_auth","join_public_channel"];

    this.req = async (req, res) => {
        
        let {public_channel_id} = req.body;

        const {user_id} = req.auth;

        if(!user_id){
            return res.status(400).json({message: "Authentication required!"});
        }

        if(!public_channel_id){
            return res.status(400).json({message: "Missing public channel id"});
        }

        let now = Date.now();

        let data = [user_id, public_channel_id, now];

        let query = `
                insert into 
                    Users_In_Public_Channels(user_id, public_channel_id, joined_time)
                values (?, ?, ?)
                `;

        try {

            await sql.query(query, data);

            res.status(200).json({message: "Successfully joined the channel"});

        }catch(err){

            console.log(query, err);

            res.status(500).json({message: "Error joining channel"});
        }
    }

};

export default request;