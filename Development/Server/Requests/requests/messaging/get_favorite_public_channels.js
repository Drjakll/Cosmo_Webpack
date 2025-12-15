function request() {
    
    this.req = (req, res) => {
        
        let {user_id} = req.body;

        let query = `
            select channel_name, channel_description, user_channel.public_channel_id from 
                Public_Channels as pc
            join
                (select * from 
                    Users_In_Public_Channels
                where 
                    user_id = ${user_id}) as user_channel
            where 
                user_channel.public_channel_id = pc.id
            `;

        this.sql.query(query, (err, results) => {
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Failed to retrieve favorite public channels", channels: null});
            } else {
                res.json({message: "Successfully retrieved favorite public channels", channels: results});
            }

        });
       
    };
};

export default request;