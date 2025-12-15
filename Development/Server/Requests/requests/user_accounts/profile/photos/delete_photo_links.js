let request = function() {
    
    this.req = (req, res) => { 
        
        let {photos} = req.body;
        
        if(Object.keys(photos).length === 0){
            res.json({message:"No photo data has been deleted"});
            res.end();
            return;
        }
     
        let query = `delete from User_Photo_Links where `;
        
        for(let i in photos){
            
            query += ` id = ${photos[i].id} or`;
            
        }
        
        query = query.slice(0, -3);
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error deleting photo"});
            }else {
                res.json({message: `Successfully deleted ${result.affectedRows} photo links`});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

