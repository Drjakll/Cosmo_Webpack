let request = function () {
    
    this.req = (req, res) => { 
        
        let { to_insert, table_name } = req.body;

        let query = `insert into ${table_name} (`;

        for(let key in to_insert){

            query += `${key},`;
        }

        query = query.slice(0, -1) + ") values ?";


        
        this.sql.query(query, [[to_insert]], (err, result)=>{
            
            if(err){

                console.log(query, err.sqlMessage);

            }
            
            res.end();
            
        });

    };
};

export default request;

