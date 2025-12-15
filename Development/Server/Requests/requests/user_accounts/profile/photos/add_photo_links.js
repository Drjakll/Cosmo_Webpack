let request = function() {
    
    
    this.req = (req, res) => { 
        
        let photo_data = req.body;
        
        let count = photo_data.length;
        
        let completed = 0;
        
        let recursion = (index)=>{
            
            if(index >= count){
                res.json({message: `Added ${completed} out of ${count} entries`});
                res.end();
                return;
            }
            
            let photo = photo_data[index];
            
            let query = this.generate_insert_query("User_Photo_Links", photo);

            this.sql.query(query, (err, results)=>{

                if(err){
                    console.log(query, err.sqlMessage);
                } else {
                    completed++;
                }
                
                recursion(index + 1);
                
            });
        };
        
        recursion(0);
                
    };
};

export default request;

