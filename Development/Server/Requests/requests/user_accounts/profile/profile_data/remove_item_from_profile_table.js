let request = function ({sql}) {

    this.req_path = "/remove_item_from_profile_table/:table_name/:id";
    this.req_type = "delete";
    this.callbacks = ["central_auth", "remove_item_from_profile_table"];
    
    this.req = async (req, res) => { 
        
        let { table_name, id } = req.params;
        let {user_id} = req.auth;

        let query = `delete from ${table_name} where id = ? and user_id = ?`;

        
        try {

            let [result] = await sql.query(query, [id, user_id]);

            if(result.affectedRows === 0){
                return res.status(404).json({message: "No matching entry", success: 0});
            }

            res.status(200).json({message: "Successfully removed entry", success: 1});

        } catch(err){
            
            console.log(query, err);

            res.status(500).json({message: "Error on removing entry", success: 0});
        }   

    };
};

export default request;

