let request = function () {
    
    this.req = async (req, res) => { 
        
        let { to_update, table_name, id } = req.body;

        if(Object.keys(to_update).length === 0 || !table_name || !id){
            res.end();
            return;
        }
        
        let query = `update ${table_name} set ? where id = ?`;
                                                
        try {

            await this.sql.query(query, [to_update, id]);
            
        }catch(err){

            console.log(query, err);
        }

        res.end();

    };
};

export default request;

