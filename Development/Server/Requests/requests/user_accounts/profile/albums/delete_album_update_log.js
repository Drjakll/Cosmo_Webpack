let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/delete_album_update_log";
    this.req_type = "post";
    this.callbacks = ["delete_album_update_log"];
    
    this.req = async (req, res) => { 
        
        let {time_uploaded, album_info} = req.body;

        let data = [
            time_uploaded
        ];

        let query = `delete from Photo_Album_Update_Logs where time_occured = ?`;
        
        try {

            let [result] = await this.sql.query(query, data);

            res.json({message: `All photos on this update has been erased`, photos: [], album_info});

        }catch(err){

            res.json({message: "Failed to log onto album update!", failed: true, album_info: {}});

        }
    };
};

export default request;