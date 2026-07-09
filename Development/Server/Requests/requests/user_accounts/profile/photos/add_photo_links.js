let request = function(sql, s3, PutObjectCommand) {
    
    this.req_path = "/add_photo_links";
    this.req_type = "post";
    this.callbacks = ["add_photo_links"];
    
    this.req = async (req, res, next) => { 
        
        let {links, target_type, target_id} = req.body;

        let time_uploaded = Date.now();

        let to_be_inserted = [];

        for(let link of links){

            to_be_inserted.push([link, target_type, target_id, time_uploaded]);

        }

        let query = `insert into Photo_Links(link, target_type, target_id, time_uploaded) values ?`;

        try {

            await this.sql.query(query, [to_be_inserted]);

            //If adding it to the album, then log the change
            if(target_type === "album"){

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

