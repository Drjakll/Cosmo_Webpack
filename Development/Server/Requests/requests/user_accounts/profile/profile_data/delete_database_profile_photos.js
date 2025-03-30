let request = function() {
    
    this.req = (req, res) => { 
        
        let { photos } = req.body;
        
        if(Object.keys(photos).length === 0){
            res.json({message: "No data deleted"});
            res.end();
            return;
        }
        
        let query = `delete from Profile_Pictures where `;
        
        for(let i in photos){
            
            query += `id = ${photos[i].id} or `;
        }
        
        query = query.slice(0, -3);
        
        this.sql.query(query, (err, results)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error deleting database"});
            } else if (results.affectedRows === 0){
                res.json({message: "No data deleted"});
            } else {
                res.json({message: "Successfully deleted database"});
            }
            
            res.end();
            
        });

    };
};

export default request;

