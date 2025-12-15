let request = function() {
    
    this.req = (req, res) => { 
        
        let {email} = req.body;
        
        let query = `select * from Post_Data where owner_email = '${email}'
                                               order by date_created desc`;
        
        this.sql.query(query, (err, results)=>{
            
            let query2 = "";
            let timestamp = null;
            
            if(err){
                
                console.log(query, err.sqlMessage);
                res.json({message: "Error retrieving post(s)", last_posted: null});
                res.end();
                return;
            
            } else if(results.length === 0) {
                
                query2 = `update User_Accounts set last_posted = null where email = '${email}'`;
                
            }
            else {
                
                timestamp = Date.now();
                
                
                query2 = `update User_Accounts set last_posted = '${timestamp}'
                                                   where email = '${email}'`;
           
            }
            
            this.sql.query(query2, (err2, result)=>{
                   
                if(err2){

                    console.log(query2, err2.sqlMessage);
                    res.json({message:"Error updating last posted", last_posted: null});

                } else if (result.affectedRows === 0){

                    res.json({message: "No user found"});
                     
                }
                else {

                    res.json({message: "Successfully updated last posted", last_posted: timestamp});
                }

                res.end();

             });
            
        });

    };
};

export default request;
