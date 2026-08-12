let request = function({sql}) {

    this.req_path = "/get_last_time_posted";
    this.req_type = "post";
    this.callbacks = ["get_last_time_posted"];
    
    this.req = async (req, res) => { 
        
        let {user_id} = req.body;
        
        let query = `select * from Post_Data where user_id = ?
                                               order by created_on desc 
                                               limit 1`;
        
        try {

            let [results] = await sql.query(query, [user_id]);
            let last_posted = results.length === 0 ? 0 : results[0].created_on;

            res.status(200).json({last_time_posted: last_posted});

        } catch(err){

            console.log(err);

            res.status(500).json({last_time_posted: null});
        }

    };
};

export default request;
