let request = function ({sql}) {

    this.req_path = "/get_user_table_data";
    this.req_type = "post";
    this.callbacks = ["get_user_table_data"];
    
    this.req = async (req, res, next) => { 
        
        let { table_name, user_id } = req.body;

        if(!table_name || !user_id){
            res.status(400).json({message: "Invalid table name or user_id", results: []});
            return;
        }
        
        let query = `select * from ${table_name} where user_id = ?`;
                                                
        try {

            let [results] = await sql.query(query, [user_id]);


            res.status(200).json({message: "Successfully retrieved results", results});

        }catch(err){

            console.log(query, err);

            res.status(500).json({message: "Error while retrieving results", results: []});
        }

    };
};

export default request;

