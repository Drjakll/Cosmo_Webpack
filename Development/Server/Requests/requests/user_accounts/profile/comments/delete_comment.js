let request = function() {
    
    
    this.req = (req, res) => { 
        
        let {id, target_id, target_type} = req.body;
 
        let requirements = [id, target_id, target_type]

        let query = `delete from Comments where id = ? and target_id = ? and target_type = ?`;
        
        try {

            this.sql.query(query, requirements);

            res.json({message: "Succesfully deleted the comment", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Failed to delete the comment", failed: true});
            
        }
    };
};

export default request;

