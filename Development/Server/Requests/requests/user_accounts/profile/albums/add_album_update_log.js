let request = function() {

    this.req_path = "/add_album_update_log";
    this.req_type = "post";
    this.callbacks = ["add_album_update_log"];
    
    this.req = async (req, res, next) => { 
        
        //time_occured is strictly mapped to the time of the update
        let {album_id, time_occurred, user_id} = req.body;

        let data = [
            album_id,
            time_occurred,
            user_id
        ];

        let query = `insert into Photo_Album_Update_Logs(album_id, time_occurred, user_id) values(?,?,?);`;
        
        try {

            let [result] = await this.sql.query(query, data);

            req.body.target_type = "album_updates";
            req.body.target_id = result.insertId;
            req.body.created_on = time_occurred;

            //Should called add_to_feeds.js
            next();

        }catch(err){

            console.log(query, err);

            res.json({message: "Failed to log onto album update!", failed: true});
        }
    };
};

export default request;

