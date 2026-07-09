let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/get_album_update_logs";
    this.req_type = "post";
    this.callbacks = ["get_album_update_logs",
        "get_single_album",
        "get_photo_links",
        "delete_album_update_log" //This will be called only if all the updated photos are deleted
    ];
    
    this.req = async (req, res, next) => { 
        
        let {id} = req.body;

        let data = [
            id
        ];

        let query = `select * from Photo_Album_Update_Logs where id = ?`;
        
        try {

            let [result] = await this.sql.query(query, data);

            if(result.length === 0){
                res.json({message: "Photo album log doesn't exist", photos: [], album_info: {}});
                return;
            }

            //Preparing to call get_photo_links.js
            let {album_id, time_occured} = result[0];

            req.body.album_id = album_id;
            req.body.time_uploaded = time_occured; //Getting the specific update according to the time stamp

            //Should be get_single_album.js
            next();

        }catch(err){

            console.log(query, err);

            res.json({message: "Failed to log onto album update!", failed: true});

        }
    };
};

export default request;

