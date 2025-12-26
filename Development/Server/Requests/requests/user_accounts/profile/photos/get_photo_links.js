let request = function() {
    
    this.req = (req, res) => { 
        
        let {target_id, target_type} = req.body;
        
        let query = `select * from Photo_Links where target_id = ${target_id} and target_type = '${target_type}'`;
        
        this.sql.query(query, (err, results)=>{
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error retreiving photos", photos: []});
            } else if (results.length === 0){
                res.json({message: "No data retrieved", photos: []});
            } else {
                res.json({message: "Successfully retrieved photos!", photos: results});
            }
            
            res.end();
            
        });

    };
};

export default request;

