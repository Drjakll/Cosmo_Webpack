let request = function() {
    
    this.req = (req, res) => { 
        
        let profile_photo = req.body;
        
        let query = this.generate_insert_query("Profile_Pictures", profile_photo);
        
        this.sql.query(query, (err, results)=>{
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error inserting profile photo"});
            } else if (results.affectedRows === 0){
                res.json({message: "No data inserted"});
            } else {
                res.json({message: "Successfully inserted photo data"});
            }
            
            res.end();
            
        });

    };
};

export default request;

