function request() {
    
    this.req = (req, res) => {
        
        let acc_details = req.body;
        
        let query = this.generate_insert_query("User_Accounts", acc_details);
      
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error creating the account.", success: false});
            } else {
                res.json({message: "Account successfully created.", success: true});
            }
            
            res.end();
        });
    };
};

export default request;