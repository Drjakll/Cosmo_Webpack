let request = function() {
    
    this.req = (req, res) => { 
        
        let {user_id} = req.body;
        
        let query = `select * from Post_Data where user_id = '${user_id}'
                                               order by created_on desc 
                                               limit 1`;
        
        this.sql.query(query, (err, results)=>{
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({last_time_posted: null})
                return;
            } else {

                let last_posted = results.length === 0 ? Date.now() : results[0].created_on;

                res.json({last_time_posted: last_posted});
            }
            
        });

    };
};

export default request;
