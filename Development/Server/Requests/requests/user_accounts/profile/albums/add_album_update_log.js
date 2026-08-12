let request = function({sql}) {

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];
    
    this.req = async (req, res, next) => { 
        
        //time_occured is strictly mapped to the time of the update
        let {album_id, time_occurred, result} = req.body;
        const {user_id} = req.auth;

        let data = [
            album_id,
            time_occurred,
            user_id
        ];

        let query = `insert into Photo_Album_Update_Logs(album_id, time_occured, user_id) values(?,?,?);`;
        
        try {

            let [result] = await sql.query(query, data);

            req.body.target_id_type = "album_updates_id";
            req.body.target_id = result.insertId;
            req.body.created_on = time_occurred;

            //Should called add_to_feeds.js
            next();

        }catch(err){

            console.log(query, err);

            res.status(500).json({message: "Failed to log onto album update!", failed: true, result: null});
        }
    };
};

export default request;

