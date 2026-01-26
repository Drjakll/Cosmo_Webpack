function request() {
    
    this.req = async (req, res, next) => {
        
        let {channel_name, channel_description} = req.body;

        let data = [channel_name, channel_description];

        let query = `
                insert into 
                    Public_Channels(channel_name, channel_description)
                values (?, ?)
                on duplicate key update 
                    id = last_insert_id(id)
                `;
        
        try {

            let [result] = await this.sql.query(query, data);

            req.body.public_channel_id = result.insertId;

            console.log(result.insertId);

            //Should call join_public_channel
            next();

        }catch(err){

            console.log(query, err);

            res.json({message: "Error creating channel"});

        }
    }

};

export default request;