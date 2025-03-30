let request = function() {
    
    
    this.req = (req, res) => { 
        
        let album = req.body;
        
        if(!album.id || !album.owner_email){
            res.json({message: "Error updating album"});
            res.end();
        }
        
        let query = this.generate_update_query("Photo_Albums", album, {id: album.id, owner_email: album.owner_email});
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error updating album"});
            } else {
                res.json({message: `Successfully updated ${result.affectedRows} row(s)`});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

