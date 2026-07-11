let request = function({sql}) {
    

    this.req_path = "/update_reaction";
    this.req_type = "post";
    this.callbacks = ["update_reaction"];

    this.req = async (req, res) => { 
        
        let {target_id, emojis, reaction, user_id, target_type} = req.body;
 

        let data = target_type ? 
        [  
            emojis,
            reaction,
            target_id,
            user_id,
            target_type,
        ]
        :
        [
            emojis,
            reaction,
            target_id, 
            user_id
        ];

        let table_name = target_type ? "General_Reactions" : "Comment_Reactions";

        
        let query = `update ${table_name} set emojis = emojis ^ ?, reaction = ? where target_id = ? and user_id = ? ${target_type ? "and target_type = ?" : ""}`;
        
        try {

            await sql.query(query, [data]);

            res.json({message: "Successfully submitted a reaction", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error submitting a reaction", failed: true});

        }
                
    };
};

export default request;

