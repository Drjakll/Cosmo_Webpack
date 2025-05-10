function request() {
    
    this.req = (req, res) => {
        
        let host_data = req.body;
            
        let query = this.generate_insert_query("Current_Stream_Rooms");
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Failed to create a room"});
            } else {
                res.json({message: "Room created"});
            }
            
            res.end();
        });
       
    };
};

export default request;