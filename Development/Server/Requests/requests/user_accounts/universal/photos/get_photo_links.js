let request = function({sql}) {

    this.req_path = "/get_photo_links";
    this.req_type = "post";
    this.callbacks = ["get_photo_links",
        "get_reactions"
    ];
    
    this.req = async (req, res, next) => { 
        
        let {target_id, target_id_type, id, time_uploaded} = req.body;

        //If id exists, we just wanted to search one photo link, else search for a list of photo links based on target_id and target_type
        let requirements = id ? [id] : [target_id];

        //If time_uploaded exists, then we probably want photos for updates in a timeline
        requirements = time_uploaded ? [target_id, time_uploaded] : requirements;

        /*----*/

        //part of the query for the requirements. If only search for a single id or search within the group of target_id
        let where_query = id ? "pl.id = ?" : `pl.${target_id_type} = ?`;

        where_query = time_uploaded ? `pl.${target_id_type} = ? and time_uploaded = ?` : where_query;
        
        let query = `select 
                        pl.*,
                        (select count(*) from Comments where photo_id = pl.id) as comments_count
                    from 
                        Photo_Links as pl

                    where 
                        ${where_query}
                    group by 
                        pl.id`;
        
        try {

            let [results] = await sql.query(query, requirements);
            

            if(time_uploaded){
                //If time_uploaded exists, it means it's searching for a time line in a single album, which means it's coming from
                //get_single_album.js, so album_info should exist as well.
                //This block is made mainly for the purpose of getting feed updates
                let {album_info} = req.body;

                return results.length !== 0 ? 
                    res.json({message: `Successfully retrieved ${results.length} photo links`, photos: results, album_info})
                    :
                    //If all photos on the feed update is erased, then go to delete_album_update_log.js
                    next();
                ;
                
            }
            
            req.body.targets = results;
            req.body.target_id_type = "photo_id";
            
            req.body.photos = results; //In case delete_photo_links is the next middleware
            
            //Either go to delete_photo_links or get_reactions
            next();

        } catch(err){

            console.log(query, err);

            res.json({result: [], message: "Error retrieving photo links"});

        }

    };
};

export default request;

