function request() {
    
    this.req = (req, res) => {
        
        let host_data = req.body;
            
        let query = `delete from Current_Stream_Rooms where id = ${host_data.id}`;
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Failed to disband the room"});
            } else {
                res.json({message: "Room disbanded"});
            }
            
            res.end();
            
        });
       
    };
};

export default request;