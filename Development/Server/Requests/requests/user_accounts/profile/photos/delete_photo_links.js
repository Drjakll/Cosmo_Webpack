let request = function() {
    
    this.req = (req, res, next) => { 
        
        let { photos } = req.body;
        
        if(photos.length === 0){
            res.json({message:"No photo data has been deleted"});
            return;
        }
     
        let query = `delete from User_Photo_Links where (id, target_id, target_type) in ?`;
        
        
        this.sql.query(query, [photos], (err, result)=>{
           
            if(err){
                
                console.log(query, err.sqlMessage);
                res.json({message: "Error deleting photo"});

            }else {

                //On to erasing the data files from storage
                next();
            }
            
        });
                
    };
};

export default request;

