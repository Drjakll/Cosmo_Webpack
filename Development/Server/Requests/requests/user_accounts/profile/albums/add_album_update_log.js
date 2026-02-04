let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {album_id, change_type, changes} = req.body;
        
        let time_occured = Date.now();

        let data = [
            album_id,
            change_type,
            changes,
            time_occured
        ];

        let query = `insert into Photo_Album_Update_Logs(album_id, change_type, changes, time_occured) values(?,?,?,?);`;
        
        try {

            let [result] = await this.sql.query(query, data);

            req.body.target_type = "album_updates";
            req.body.target_id = result.insertId;
            req.body.created_on = time_occured;

            //Should called add_to_feeds.js
            next();

        }catch(err){

            console.log(query, err);

            res.json({message: "Failed to log onto album update!", failed: true});
        }
    };
};

export default request;

