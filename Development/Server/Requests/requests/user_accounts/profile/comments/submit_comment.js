let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {target_id, target_type, comment} = req.body;
 
        let data = [
            {target_id, target_type, comment}
        ]
        
        let query = `insert into Comments (target_id, target_type, comment) values ?`;
        
        try {

            await this.sql.query(query, data);

            res.json({message: "Successfully submitted a comment", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error submitting a comment", failed: true});

        }
                
    };
};

export default request;

