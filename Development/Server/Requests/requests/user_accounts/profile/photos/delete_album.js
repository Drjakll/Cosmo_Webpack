let request = function() {
    
    
    this.req = (req, res) => { 
        
        let album = req.body;
        
        if(!album.id || !album.owner_email){
            res.json({message: "Error deleting album"});
            res.end();
            return;
        }
        
        let query = `delete from Photo_Albums where id = ${album.id} and owner_email = '${album.owner_email}'`;
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error deleting album"});
            } else {
                res.json({message: `Successfully deleted ${result.affectedRows} row(s)`});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

