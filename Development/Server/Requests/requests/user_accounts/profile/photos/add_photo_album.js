let request = function() {
    
    this.req = (req, res) => { 
        
        let album_data = req.body;
        
        let query = this.generate_insert_query("Photo_Albums", album_data);
        
        let now = this.generate_time_string(new Date());
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                
                console.log(err.sqlMessage);
                res.json({message: "Error adding album", result: {}});
                res.end();
                
            } else if(result.affectedRows === 0){
                
                res.json({message: "Error adding album", result: {}});
                res.end();
                
            } else {
                
                let query = `select * from Photo_Albums where created_on >= '${now}' and owner_email = '${album_data.owner_email}' and title = '${album_data.title}'`;
                
                this.sql.query(query, (err, results)=>{
                    
                    if(err){
                        console.log(err.sqlMessage);
                        res.json({messsage: "Error retrieving created album", album: {}});
                    } else if(results.length === 0){
                        res.json({message: "Error retrieving created album", album: {}});
                    } else {
                        res.json({message: "Successfully created album", album: results[0]});
                    }
                    
                    res.end();
                    
                });
                
            }
        });
    };
};

export default request;

