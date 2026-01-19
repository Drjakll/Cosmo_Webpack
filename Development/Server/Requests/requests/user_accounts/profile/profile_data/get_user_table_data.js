let request = function () {
    
    this.req = async (req, res) => { 
        
        let { table_name, user_id } = req.body;

        if(!table_name || !user_id){
            res.json({message: "Invalid table name or user_id", results: []});
            return;
        }
        
        let query = `select * from ${table_name} where user_id = ?`;
                                                
        try {

            let [results] = await this.sql.query(query, [user_id]);

            res.json({message: "Successfully retrieved results", results});
            
        }catch(err){

            console.log(query, err);

            res.json({message: "Error while retrieving results", results: []});
        }

    };
};

export default request;

