let request = function() {
    
    this.req = (req, res) => { 
        
        let {email} = req.body;
        
        let query = `select * from Post_Data where owner_email = '${email}'
                                               order by date_created desc`;
        
        this.sql.query(query, (err, results)=>{
            
            let query2 = "";
            
            if(err){
                
                console.log(err.sqlMessage);
                res.json({message: "Error retrieving post(s)"});
                res.end();
                return;
            
            } else if(results.length === 0) {
                
                query2 = `update User_Accounts set last_posted = null where email = '${email}'`;
                
            }
            else {
                
                let timestamp = this.generate_time_string(new Date(results[0].date_created));
                
                
                query2 = `update User_Accounts set last_posted = '${timestamp}'
                                                   where email = '${email}'`;
           
            }
            
            this.sql.query(query2, (err2, result)=>{
                   
                if(err2){

                    console.log(err2.sqlMessage);
                    res.json({message:"Error updating last posted"});

                } else if (result.affectedRows === 0){

                    res.json({message: "No user found"});

                }
                else {

                    res.json({message: "Successfully updated last posted"});
                }

                res.end();

             });
            
        });

    };
};

export default request;
