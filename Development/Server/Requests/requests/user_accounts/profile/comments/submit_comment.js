let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/submit_comment";
    this.req_type = "post";
    this.callbacks = ["submit_comment"];
    
    
    this.req = async (req, res) => { 
        
        let {target_id, target_id_type, comment, user_id, reply_to_id} = req.body;

        if(isNaN(parseInt(user_id)) || !target_id || !target_id_type || !comment){
            res.json({message: "Missing required fields!", failed: true});
            return;
        }   

        let now = Date.now();
 
        let data = {
            comment, 
            user_id, 
            time_stamp: now, 
            last_updated: now, 
            reply_to_id: reply_to_id ?? null
        };

        data[target_id_type] = target_id
        
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

