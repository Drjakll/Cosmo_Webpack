let request = function () {
    
    this.req_path = "/add_item_to_profile_table";
    this.req_type = "post";
    this.callbacks = ["add_item_to_profile_table"];

    this.req = async (req, res) => { 
        
        let { to_insert, table_name } = req.body;

        let query = `insert into ${table_name} set ?`;

        
        try {

            let [result] = await this.sql.query(query, [to_insert]);

            res.json({message: "Successfully added item to the profile table!", failed: 0, id: result.insertId });

        } catch(err){
            console.log(query, err);

            res.json({message: "Error while adding to profile table!", failed: 1, id: null});
        }   
    };
};

export default request;

