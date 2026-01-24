let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {target_id, target_type, id} = req.body;

        //If id exists, we just wanted to search one photo link, else search based off on target_id and target_type
        let requirements = id ? [id] : [target_id, target_type];
        
        let query = `select 
                        pl.*,
                        coalesce(c.cc, 0) as comments_count
                    from 
                        Photo_Links as pl
                    left join
                        (select 
                            target_id,
                            count(*) as cc
                        from 
                            Comments
                        where 
                            target_type = 'photo'
                        group by
                            target_id
                        ) as c
                    on
                        c.target_id = pl.id

                    where 
                        ${id ? "pl.id = ?" : "pl.target_id = ? and pl.target_type = ?"}`;
        
        try {

            let [results] = await this.sql.query(query, requirements);

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

