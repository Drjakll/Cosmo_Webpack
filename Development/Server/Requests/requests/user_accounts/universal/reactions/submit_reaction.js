let request = function({sql}) {
    
    this.req_path = "/submit_reaction";
    this.req_type = "post";
    this.callbacks = ["central_auth","submit_reaction"];
    
    this.req = async (req, res) => { 

        let {target_id, emoji, reaction, user_id, target_id_type} = req.body;

        
        if(isNaN(parseInt(user_id)) || !target_id){
            res.json({message: "Missing required fields!", failed: true});
            return;
        }

        //Differnt number of values for data depending on whether it's a comment type or some other types. Comment type would comes target_type as null
        let data = [
            target_id,  
            user_id,
            emoji,
            reaction
        ];
        
        let query = `insert into 
                        Reactions
                        (${target_id_type}, user_id, emojis, reaction) 
                    values
                        (?,?,?,?)
                    as new
                    on duplicate key
                    update 
                        reaction = case 
                                when
                                    new.reaction is null
                                    then Reactions.reaction
                                when
                                    Reactions.reaction = new.reaction 
                                    then null 
                                else
                                    new.reaction
                            end,
                        emojis = Reactions.emojis ^ new.emojis`;
        
        try {

            await sql.query(query, data);

            res.json({message: "Successfully submitted a reaction", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error submitting a reaction", failed: true});

        }
                
    };
};

export default request;

