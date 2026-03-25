let request = function () {
    
    this.req = async (req, res) => { 
        
        let { table_name, id } = req.query;

        let query = `delete from ${table_name} where id = ?`;

        
        try {

            await this.sql.query(query, [id]);

            res.json({message: "Successfully removed entry", success: 1});

        } catch(err){
            
            console.log(query, err);

            res.json({message: "Error on removing entry", success: 0});
        }   

    };
};

export default request;

