let request = function() {
    
    this.req = (req, res) => { 
        
        let acc = req.body;
        
        let query = `select * from Photo_Albums where owner_email = '${acc.email}' order by created_on desc`;

        this.sql.query(query, (err, results)=>{

            if(err){
                console.log(query, err.sqlMessage);
                res.json({messsage: "Error retrieving albums", albums: []});
            } else if(results.length === 0){
                res.json({message: "No albums retreived", albums: []});
            } else {
                res.json({message: "Successfully retrieved albums", albums: results});
            }

            res.end();

        });
                
    };
};

export default request;

