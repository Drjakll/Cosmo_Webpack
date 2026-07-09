let request = function (sql, s3, PutObjectCommand) {

    this.req_path = "/update_profile_table_data";
    this.req_type = "patch";
    this.callbacks = ["update_profile_table_data"];
    
    this.req = async (req, res) => { 
        
        let { to_update, table_name, id } = req.body;

        if(Object.keys(to_update).length === 0 || !table_name || !id){

            res.json({message: "No table information found", success: 0});
            
            return;
        }
        
        let query = `update ${table_name} set ? where id = ?`;
                                                
        try {

            await this.sql.query(query, [to_update, id]);

            res.json({message: "Successfully updated account table", success: 1});
            
        }catch(err){

            console.log(query, err);

            res.json({message: "Error while updating table", success: 0});
        }

    };
};

export default request;

