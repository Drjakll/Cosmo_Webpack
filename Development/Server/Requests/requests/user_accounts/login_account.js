let request = function(){
    
    this.req = (req, res)=>{
        
        let acc_info = req.body;
        
        let query = `select * from User_Accounts where email = '${acc_info.email}' and password = '${acc_info.password}'`;
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                
                console.log(err.sqlMessage);
                res.json({message: "Error logging in.", acc_info: null, status: 0b01});
                
            } else {
                
                if(result.length === 0){
                    res.json({message: "Email and password don't match.", acc_info: null, status: 0b10});
                } else {
                    res.json({message: "Login successful.", acc_info: result[0], status: 0b11});
                }
            }
            
            res.end();
            
        });
    };
    
};

export default request;


