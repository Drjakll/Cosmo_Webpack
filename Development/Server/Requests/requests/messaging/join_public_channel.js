function request() {
    
    this.req = (req, res) => {
        
        let {public_channel_id, user_id} = req.body;

        let now = Date.now();

        let query = `
                insert into 
                    Users_In_Public_Channels(user_id, public_channel_id, joined_time)
                values (${user_id}, ${public_channel_id}, ${now});
                `;

        this.sql.query(query, (err, result)=>{

            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error joining the public channel"});
            } else {
                res.json({message: "Successfully joined the public channel"});
            }

        });
    }

};

export default request;