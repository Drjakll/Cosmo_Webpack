let request = function (sql, s3, PutObjectCommand) {

    this.req_path = "/get_user_table_data";
    this.req_type = "post";
    this.callbacks = ["get_user_table_data"];
    
    this.req = async (req, res, next) => { 
        
        //at_index, table_names and acc_info only exist if it's retrieving data from login
        let { table_name, user_id, acc_info, at_index, table_names } = req.body;

        if(!table_name || !user_id){
            res.json({message: "Invalid table name or user_id", results: []});
            return;
        }
        
        let query = `select * from ${table_name} where user_id = ?`;
                                                
        try {

            let [results] = await this.sql.query(query, [user_id]);


            //If anyone of these doesn't exist, then the request must be coming from need only one table
            if(at_index === undefined || !table_names || !acc_info){

                res.json({message: "Successfully retrieved results", results}); //It is no mistake that this uses results as the key instead of acc_info

            } else {

                acc_info[table_name] = results;

                at_index++;

                table_name = table_names[at_index];

                if(at_index === table_names?.length){

                    return res.json({message: "Successfully retrieved account information", acc_info, status: 0b11})

                }

                req.body.at_index = at_index;
                req.body.table_name = table_name;

                next();

            }
            
        }catch(err){

            console.log(query, err);

            res.json({message: "Error while retrieving results", results: []});
        }

    };
};

export default request;

