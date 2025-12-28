let request = function () {
    
    this.req = async (req, res) => { 
        
        let { remove_req, table_name } = req.body;

        let query = `delete from ${table_name} where ?`;

        
        try {

            await this.sql.query(query, remove_req);

        } catch(err){
            console.log(query, err);
        }   

        res.end();
    };
};

export default request;

