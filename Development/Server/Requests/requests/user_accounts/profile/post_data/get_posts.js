let request = function() {
    
    this.req = (req, res) => { 
        
        let {user_id, date_interval} = req.body;
        
        let query = `select * from Post_Data where user_id = '${user_id}' 
                                               and created_on >= ${date_interval.start}
                                               and created_on <= ${date_interval.end}
                                               order by created_on desc`;

        
        this.sql.query(query, (err, results)=>{
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error retrieving post(s)", posts: []});
            } else {
                res.json({message: `Successfully retrieved ${results.length} posts`, posts: results});
            }
            
            res.end();
            
        });

    };
};

export default request;
