function request() {
    
    this.req = (req, res) => {
        
        let acc_details = req.body;

        let {email, password} = acc_details;
        
        let query = `insert into User_Accounts(email, password) values('${email}', '${password}')`;
        
        
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