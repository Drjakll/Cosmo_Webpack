let request = function () {
    
    this.req = async (req, res) => { 
        
        let { table_name, id } = req.query;

        let query = `delete from ${table_name} where id = ?`;

        
        try {

            await this.sql.query(query, [id]);

        } catch(err){
            console.log(query, err);
        }   

        res.end();
    };
};

export default request;

