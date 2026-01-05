let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {comment, id, target_type, target_id, user_id} = req.body;

        let data = { comment, last_updated: Date.now()};
 
        let query = `update Comments set ? where id = ? and target_type = ? and target_id = ? and user_id = ?`;


        try {

            await this.sql.query(query, [data, id, target_type, target_id, user_id] );

            res.json({message: "Successfully updated the comment", failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error updating the comment", failed: true});

        }        
    };
};

export default request;

