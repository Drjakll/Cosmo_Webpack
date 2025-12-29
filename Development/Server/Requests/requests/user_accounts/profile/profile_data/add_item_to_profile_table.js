let request = function () {
    
    this.req = async (req, res) => { 
        
        let { to_insert, table_name } = req.body;

        let query = `insert into ${table_name} set ?`;

        
        try {

            await this.sql.query(query, [to_insert]);

            res.json({message: "Successfully added item to the profile table!", failed: false});

        } catch(err){
            console.log(query, err);

            res.json({message: "Error while adding to profile table!", failed: true});
        }   
    };
};

export default request;

