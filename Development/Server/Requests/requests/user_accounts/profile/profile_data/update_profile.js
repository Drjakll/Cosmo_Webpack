let request = function() {
    
    this.req = (req, res) => { 
        
        let acc_details = req.body;
        
        let query = this.generate_update_query("User_Accounts", 
                                                acc_details, 
                                                {"email": acc_details.email});
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error updating profile data"});
            } else if (result.affectedRows === 0){
                res.json({message: "No account found"});
            } else {
                res.json({message: "Profile data updated!"});
            }
            
            res.end();
            
        });

    };
};

export default request;

