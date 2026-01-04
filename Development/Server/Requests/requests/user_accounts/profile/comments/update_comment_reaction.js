let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {target_id, emojis, reaction, user_id} = req.body;
 
        let data = [
            emojis,
            reaction,
            target_id, 
            user_id
        ];

        
        let query = `update Comment_Reactions set emojis = emojis ^ ?, reaction = ? where target_id = ? and user_id = ?`;
        
        try {

            await this.sql.query(query, [data]);

            res.json({message: "Successfully submitted a reaction", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error submitting a reaction", failed: true});

        }
                
    };
};

export default request;

