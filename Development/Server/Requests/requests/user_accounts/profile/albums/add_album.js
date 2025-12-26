let request = function() {
    
    this.req = (req, res) => { 
        
        let {title, user_id} = req.body;
        
        let created_on = Date.now();

        let data = [
            {
                title,
                user_id,
                created_on
            }
        ];

        let query = `insert into Photo_Albums(title, user_id, created_on) values ?`
        
        this.sql.query(query, [data], (err, result)=>{
            
            if(err){
                
                console.log(query, err.sqlMessage);
                res.json({message: "Error adding album"});
                
            } else if(result.affectedRows === 0){
                
                res.json({message: "Error adding album"});
                
            } else {
                
                res.json({message: "Successfully added an empty album"});
                
            }
        });
    };
};

export default request;

