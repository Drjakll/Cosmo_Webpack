let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {target_id, emojis, reaction, user_id} = req.body;
 
        let data = [
            target_id,  
            user_id,
            emojis,
            reaction
        ];

        
        let query = `insert into 
                        Comment_Reactions 
                    set 
                        (target_id, user_id, emojis, reaction) 
                    values
                        (?,?,?,?)
                    on duplicate key
                    update 
                        reaction = 
                            case when
                                reaction = values(reaction) 
                                then null 
                            else
                                values(reaction)
                        end,
                        emojis = emojis ^ values(emojis)`;
        
        try {

            await this.sql.query(query, data);

            res.json({message: "Successfully submitted a reaction", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error submitting a reaction", failed: true});

        }
                
    };
};

export default request;

