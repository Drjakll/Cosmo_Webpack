let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {comment, id, target_type, target_id} = req.body;

        let data = [comment, id, target_type, target_id];
 
        let query = `update Comments set comment = ? where id = ? and target_type = ? and target_id = ?`;


        try {

            await this.sql.query(query, data);

            res.json({message: "Successfully updated the comment", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error updating the comment", failed: true});

        }        
    };
};

export default request;

