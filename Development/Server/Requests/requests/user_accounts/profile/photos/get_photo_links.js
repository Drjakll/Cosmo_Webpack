let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {target_id, target_type, id, time_uploaded} = req.body;

        //If id exists, we just wanted to search one photo link, else search for a list of photo links based on target_id and target_type
        let requirements = id ? [id] : [target_id, target_type];

        //If time_uploaded exists, then we probably want photos for updates in a timeline
        requirements = time_uploaded ? [target_id, target_type, time_uploaded] : requirements;

        /*----*/

        //part of the query for the requirements. 
        let where_query = id ? "pl.id = ?" : "pl.target_id = ? and pl.target_type = ?";

        where_query = time_uploaded ? "pl.target_id = ? and pl.target_type = ? and time_uploaded = ?" : where_query;
        
        let query = `select 
                        pl.*,
                        coalesce(count(c.id), 0) as comments_count
                    from 
                        Photo_Links as pl
                    left join
                        Comments as c
                    on
                        c.target_id = pl.id

                    where 
                        ${where_query}
                    group by 
                        pl.id`;
        
        try {

            let [results] = await this.sql.query(query, requirements);

            if(time_uploaded){
                //If time_uploaded exists, it means it's searching for a time line in a single album. So album_info should exist as well.
                let {album_info} = req.body;

                res.json({message: `Successfully retrieved ${results.length} photo links`, photos: results, album_info});
                return;
            }
            
            req.body.targets = results;
            req.body.target_type = "photo";
            
            req.body.photos = results; //In case delete_photo_links is the next middleware
            
            //Either go to delete_photo_links or get_general_reactions
            next();

        } catch(err){

            console.log(query, err);

            res.json({result: [], message: "Error retrieving photo links"});

        }

    };
};

export default request;

