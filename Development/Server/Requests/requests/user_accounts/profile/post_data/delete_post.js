let request = function() {
    
    this.req = (req, res) => { 
        
        let {id, owner_email} = req.body;
        
        let query = `delete from Post_Data where id = ${id} and owner_email = '${owner_email}'`;
        
        this.sql.query(query, (err, result)=>{
            
            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error deleting post"});
            } else if (result.affectedRows === 0){
                res.json({message: "No post found"});
            } else {
                res.json({message: "Post deleted"});
            }
            
            res.end();
            
        });

    };
};

export default request;
