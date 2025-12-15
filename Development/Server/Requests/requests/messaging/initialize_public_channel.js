function request() {
    
    this.req = (req, res) => {
        
        let {channel_name, channel_description} = req.body;

        channel_name = channel_name.replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"');
        channel_description = channel_description.replace(/\\/g, "\\\\").replace(/\'/g, "\\'").replace(/\"/g, '\\"');

        let query = `
            insert into
                Public_Channels(channel_name, channel_description)
            values ('${channel_name}', '${channel_description}');`;

        this.sql.query(query, (err, result) => {
            
            if(err){
                //This will happen if a duplicate channel name appears
                
                query = `select * from 
                            Public_Channels
                        where
                            channel_name = '${channel_name}';`;
                
                //If this happens, we will get the entry with the given channel name
                this.sql.query(query, (err2, result2)=>{

                    if(err2 || result2.length === 0){

                        console.log(query, err2?.sqlMessage);

                        res.json({message: "Failed to initiate public channel", public_channel_id: null});

                    } else {

                        res.json({message: "Successfully initiated the public channel", public_channel_id: result2[0].id});
                    }

                });

            } else {
                
                res.json({message: "Successfully initiated the public channel", public_channel_id: result.insertId});

            }

        });
       
    };
};

export default request;