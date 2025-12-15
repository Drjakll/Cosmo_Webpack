function request() {
    
    this.req = (req, res) => {
        
        let {public_channel_id, user_id} = req.body;

        let query = `delete from 
                        Users_In_Public_Channels
                    where 
                        user_id = ${user_id} and
                        public_channel_id = ${public_channel_id};
                    `;

        this.sql.query(query, (err, result) => {
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error leaving the public channel"});
            } else {
                
                res.json({message: "Successfully left the public channel"});
            
            }

        });
       
    };
};

export default request;