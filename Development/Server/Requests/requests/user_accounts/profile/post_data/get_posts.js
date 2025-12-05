let request = function() {
    
    this.req = (req, res) => { 
        
        let {owner_email, order, date_interval} = req.body;
        
        let query = `select * from Post_Data where owner_email = '${owner_email}' 
                                               and date_created >= ${date_interval.start}
                                               and date_created <= ${date_interval.end}
                                               order by date_created ${order}`;

        
        this.sql.query(query, (err, results)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error retrieving post(s)", posts: []});
            } else {
                res.json({message: `Successfully retrieved ${results.length} posts`, posts: results});
            }
            
            res.end();
            
        });

    };
};

export default request;
