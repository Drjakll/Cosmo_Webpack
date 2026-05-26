let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {target_id, target_type, comment, user_id, reply_to_id} = req.body;

        if(isNaN(parseInt(user_id)) || !target_id || !target_type || !comment){
            res.json({message: "Missing required fields!", failed: true});
            return;
        }   

        let now = Date.now();
 
        let data = {
            target_id, 
            target_type, 
            comment, 
            user_id, 
            time_stamp: now, 
            last_updated: now, 
            reply_to_id: reply_to_id ?? null
        };
        
        let query = `insert into Comments set ?`;
        
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

