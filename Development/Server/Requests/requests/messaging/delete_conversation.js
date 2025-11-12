function request() {
    
    this.req = (req, res) => {
        
        let {id} = req.body;
        
        let query = `delete from Messaging where id = ${id}`;
        
        this.sql.query(query, (err, results) => {
        
            if(err){
                console.log(err.sqlMessage);
                res.json({message: `Error deleting conversation`});
            } else {
                res.json({message: `Successfully deleted conversation`});
            }

            res.end();
        });
       
    };
};

export default request;