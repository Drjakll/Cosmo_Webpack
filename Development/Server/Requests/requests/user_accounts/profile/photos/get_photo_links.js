let request = function() {
    
    this.req = (req, res) => { 
        
        let album = req.body;
        
        let query = `select * from User_Photo_Links where owner_email = '${album.owner_email}' and belongs_to_album = ${album.id}`;
        
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

