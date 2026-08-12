let request = function({sql}) {

    this.req_path = "";
    this.req_type = null;
    this.callbacks = [];
    
    this.req = async (req, res) => { 
        
        let {time_uploaded, album_info, user_id} = req.body;

        if(!user_id){
            return res.status(401).json({message: "Authentication error"});
        }

        let data = [
            time_uploaded,
            user_id
        ];

        let query = `delete from Photo_Album_Update_Logs where time_occured = ? and user_id = ?`;
        
        try {

            let [result] = await sql.query(query, data);

            res.status(200).json({message: `All photos on this update has been erased`, failed: false, photos: [], album_info});

        }catch(err){

            res.status(500).json({message: "Failed to log onto album update!", failed: true, album_info: {}});

        }
    };
};

export default request;