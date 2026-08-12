let request = function({sql}) {
    
    this.req_path = "/submit_reaction";
    this.req_type = "post";
    this.callbacks = ["central_auth","submit_reaction"];

    const Possible_Emojis = ["sad","laugh","sympathetic","passionate","surprised","angry",""];
    const Possible_Reactions = ["like","dislike","",null]; 
    
    this.req = async (req, res) => { 

        let {target_id, emoji, reaction, target_id_type} = req.body;

        const {user_id} = req.auth;

        if(!Possible_Emojis.includes(emoji)){
            res.status(400).json({message: "Missing emoji!", failed: true});
            return;
        }

        if(!Possible_Reactions.includes(reaction)){
            res.status(400).json({message: "Missing reaction!", failed: true});
            return;
        }
        
        if(!target_id){
            res.status(400).json({message: "Missing target_id!", failed: true});
            return;
        }

        if(!target_id_type){
            res.status(400).json({message: "Missing target_id_type!", failed: true});
            return;
        }
        
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

            res.status(200).json({message: "Successfully submitted a reaction", failed: false});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error submitting a reaction", failed: true});

        }
                
    };
};

export default request;

