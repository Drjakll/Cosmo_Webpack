let request = function ({sql}) {

    this.req_path = "/remove_item_from_profile_table";
    this.req_type = "delete";
    this.callbacks = ["central_auth", "remove_item_from_profile_table"];
    
    this.req = async (req, res) => { 
        
        let { table_name, id } = req.query;

        let query = `delete from ${table_name} where id = ?`;

        
        try {

            await sql.query(query, [id]);

            res.json({message: "Successfully removed entry", success: 1});

        } catch(err){
            
            console.log(query, err);

            res.json({message: "Error on removing entry", success: 0});
        }   

    };
};

export default request;

