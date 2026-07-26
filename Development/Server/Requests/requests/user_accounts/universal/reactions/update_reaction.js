let request = function({sql}) {
    

    this.req_path = "/update_reaction";
    this.req_type = "post";
    this.callbacks = ["central_auth","update_reaction"];

    this.req = async (req, res) => { 
        
        let {target_id, emojis, reaction, user_id, target_id_type} = req.body;
 

        let data = 
        [
            emojis,
            reaction,
            target_id, 
            user_id
        ];

        
        let query = `update Reactions set emojis = emojis ^ ?, reaction = ? where ${target_id_type} = ? and user_id = ?`;
        
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

