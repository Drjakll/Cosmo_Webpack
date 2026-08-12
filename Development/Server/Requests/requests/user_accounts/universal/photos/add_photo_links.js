let request = function({sql}) {
    
    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];

    let target_id_types = ["album_id", "post_id", "profile_id"];
    
    this.req = async (req, res, next) => { 
        
        let {links, target_id_type, target_id} = req.body;

        const {user_id} = req.auth;

        if(!links || !target_id_type || !target_id || !user_id){
            res.status(400).json({message: "Missing required fields", failed: true});
            return;
        }

        if(!Array.isArray(links) || links.length === 0){
            res.status(400).json({message: "Links must be a non-empty array", failed: true, result: null});
            return;
        }

        if(!target_id_types.includes(target_id_type)){
            res.status(400).json({message: "Invalid target_id_type", failed: true, result: null});
            return;
        }

        let time_uploaded = Date.now();

        let to_be_inserted = [];

        for(let link of links){

            to_be_inserted.push([link, target_id, time_uploaded, user_id]);

        }

        let query = `insert into Photo_Links(link, ${target_id_type}, time_uploaded, user_id) values ?`;

        try {

            let [result] = await sql.query(query, [to_be_inserted]);

            let {insertId} = result;

            let added_photos = []

            for(let i = 0; i < to_be_inserted.length; i++){
                
                let [link, target_id, time_uploaded, user_id] = to_be_inserted[i];

                added_photos.push({id: insertId + i, link, target_id, time_uploaded, user_id});
                
            }

            //If adding it to the album, then log the change
            if(target_id_type === "album_id"){

                req.body.album_id = target_id;
                req.body.time_occurred = time_uploaded;
                req.body.result = added_photos;

                //This should call add_album_update_log.js
                next();
                return;
            }

            //For any others, profile_id, post_id
            res.status(200).json({message: "Successfully added photo links!", failed: false, result: added_photos });

        } catch (err){

            console.log(err, query);

            res.status(500).json({message: "Error adding photo links", failed: true, result: null});
        }
    }
};

export default request;

