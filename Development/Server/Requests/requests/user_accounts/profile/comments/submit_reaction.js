let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {target_id, emoji, reaction, user_id, target_type} = req.body;

        if(isNaN(parseInt(user_id)) || !target_id || !emoji || !reaction){
            res.json({message: "Missing required fields!", failed: true});
            return;
        }
 
        //Differnt number of values for data depending on whether it's a comment type or some other types. Comment type would comes target_type as null
        let data = target_type ? 
        [
            target_id,  
            user_id,
            emoji,
            reaction,
            target_type
        ]
        :
        [
            target_id,  
            user_id,
            emoji,
            reaction
        ];

        let table_name = target_type ? "General_Reactions" : "Comment_Reactions"
        
        let query = `insert into 
                        ${table_name} 
                        (target_id, user_id, emojis, reaction ${target_type ? ",target_type" : ""}) 
                    values
                        (?,?,?,?${target_type ? ",?" : ""})
                    as new
                    on duplicate key
                    update 
                        reaction = case 
                                when
                                    new.reaction is null
                                    then ${table_name}.reaction
                                when
                                    ${table_name}.reaction = new.reaction 
                                    then null 
                                else
                                    new.reaction
                            end,
                        emojis = ${table_name}.emojis ^ new.emojis`;
        
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

