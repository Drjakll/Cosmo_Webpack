function request({sql}) {
    
    this.req_path = "/get_favorite_public_channels";
    this.req_type = "post";
    this.callbacks = ["central_auth","get_favorite_public_channels"];

    this.req = async (req, res) => {
        
        let {user_id} = req.auth;

        let data = [user_id];

        let query = `
            select 
                pc.channel_name, 
                pc.channel_description, 
                users.public_channel_id as public_channel_id
            from 
                Public_Channels as pc
            join
                Users_In_Public_Channels as users
            on
                users.public_channel_id = pc.id
            
            where 
                users.user_id = ?
            `;

        try {

            let [results] = await sql.query(query, data);

            res.status(200).json({message: "Successfully retrieved favorite public channels", channels: results});

        }catch(err){

            console.log(query, err);

            res.status(500).json({message: "Failed to retrieve favorite public channels", channels: []});
        }
       
    };
};

export default request;