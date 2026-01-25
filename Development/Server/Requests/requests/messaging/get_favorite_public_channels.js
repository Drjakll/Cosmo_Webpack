function request() {
    
    this.req = async (req, res) => {
        
        let {user_id} = req.body;

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

            let [results] = await this.sql.query(query, data);

            res.json({message: "Successfully retrieved favorite public channels", channels: results});

        }catch(err){

            console.log(query, err);

            res.json({message: "Failed to retrieve favorite public channels", channels: null});
        }
       
    };
};

export default request;