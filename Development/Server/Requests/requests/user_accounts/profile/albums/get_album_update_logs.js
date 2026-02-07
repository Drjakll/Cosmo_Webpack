let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {id} = req.body;

        let data = [
            id
        ];

        let query = `select * from Photo_Album_Update_Logs where id = ?`;
        
        try {

            let [result] = await this.sql.query(query, data);

            if(result.length === 0){
                res.json({message: "Error fetching photo album update logs"});
                return;
            }

            let {album_id, time_occurred} = result[0];

            req.body.album_id = album_id;
            req.body.time_uploaded = time_occurred;

            next();

        }catch(err){

            console.log(query, err);

            res.json({message: "Failed to log onto album update!", failed: true});

        }
    };
};

export default request;

