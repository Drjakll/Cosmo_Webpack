function request() {
    
    this.req = (req, res) => {
        
        let search_crit = req.body;
        
        let query = this.generate_get_query("Current_Stream_Rooms", search_crit);
        
        this.sql.query(query, (err, results) => {
        
            if(err){
                console.log(err.sqlMessage);
                res.json({message: `Error searching for streams`, streams: []});
            } else if (results.length === 0){
                res.json({message: `Found ${results.length} entries`, streams: []});
            } else {
                res.json({message: `Found ${results.length} entries`, streams: results});
            }

            res.end();
        });
       
    };
};

export default request;