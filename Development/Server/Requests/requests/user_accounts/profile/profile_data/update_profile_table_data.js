let request = function ({sql}) {

    this.req_path = "/update_profile_table_data";
    this.req_type = "patch";
    this.callbacks = ["central_auth","update_profile_table_data"];
    
    this.req = async (req, res) => { 
        
        let { to_update, table_name, id } = req.body;
        const {user_id} = req.auth;

        if(Object.keys(to_update).length === 0 || !table_name || !id){

            res.status(400).json({message: "No table information found", success: 0});
            
            return;
        }
        
        let query = `update ${table_name} set ? where id = ? and user_id = ?`;
                                                
        try {

            let [result] = await sql.query(query, [to_update, id, user_id]);

            if(result.affectedRows === 0){

                return res.status(404).json({message: "No matching found", success: 0});
                
            }

            res.status(200).json({message: "Successfully updated account table", success: 1});
            
        }catch(err){

            console.log(query, err);

            res.status(500).json({message: "Error while updating table", success: 0});
        }

    };
};

export default request;

