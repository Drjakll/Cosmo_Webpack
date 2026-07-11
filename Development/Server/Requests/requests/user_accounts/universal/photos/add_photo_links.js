let request = function({sql}) {
    
    this.req_path = "/add_photo_links";
    this.req_type = "post";
    this.callbacks = ["add_photo_links"];

    let target_id_types = ["album_id", "post_id", "profile_id"];
    
    this.req = async (req, res, next) => { 
        
        let {links, target_id_type, target_id, user_id} = req.body;

        if(!links || !target_id_type || !target_id || !user_id){
            res.json({message: "Missing required fields", failed: true});
            return;
        }

        if(!Array.isArray(links) || links.length === 0){
            res.json({message: "Links must be a non-empty array", failed: true});
            return;
        }

        if(!target_id_types.includes(target_id_type)){
            res.json({message: "Invalid target_id_type", failed: true});
            return;
        }

        let time_uploaded = Date.now();

        let to_be_inserted = [];

        for(let link of links){

            to_be_inserted.push([link, target_id, time_uploaded, user_id]);

        }

        let query = `insert into Photo_Links(link, ${target_id_type}, time_uploaded, user_id) values ?`;

        try {

            await sql.query(query, [to_be_inserted]);

            //If adding it to the album, then log the change
            if(target_id_type === "album_id"){

                req.body.album_id = target_id;
                req.body.time_occurred = time_uploaded;

                //This should call add_album_update_log.js
                next();
                return;
            }

            res.json({message: "Successfully added photo links!"});

        } catch (err){

            console.log(err, query);

            res.json({message: "Error adding photo links"});
        }
    }
};

export default request;

