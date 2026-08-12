let request = function({sql}) {

    this.req_path = "/submit_comment";
    this.req_type = "post";
    this.callbacks = ["central_auth","is_user_blocked","submit_comment"];
    
    
    this.req = async (req, res) => { 
        
        let {target_id, target_id_type, comment, reply_to_id} = req.body;
        const {user_id} = req.auth;

        if(isNaN(parseInt(user_id)) || !target_id || !target_id_type || !comment){
            res.status(400).json({message: "Missing required fields!", failed: true});
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

            let [result] = await sql.query(query, data);

            let {insertId} = result;

            res.status(200).json({message: "Successfully submitted a comment", failed: false, insertId });

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error submitting a comment", failed: true, insertId: null});

        }
                
    };
};

export default request;

