
let request = function() {
    
    this.req = (req, res) => { 
        
        let acc = req.body;
        
        let query = `select * from Profile_Pictures where belongs_to_user_email = '${acc.email}'`;
        
        this.sql.query(query, (err, results)=>{
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error retreiving photos", profile_photos: []});
            } else if (results.length === 0){
                res.json({message: "No data retrieved", profile_photos: []});
            } else {
                res.json({message: "Successfully retrieved photos!", profile_photos: results});
            }
            
            res.end();
            
        });

    };
};

export default request;