let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {target_id, target_type} = req.body;

        let requirements = [target_id, target_type];
        
        let query = `select 
                        pl.*,
                        coalesce(c.cc, 0) as comments_count,
                        coalesce(gr.reactions, json_array()) as reactions
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
                    left join
                        (select
                            target_id,
                            json_arrayagg(
                                json_object(
                                    'id', id,
                                    'user_id', user_id,
                                    'target_id', target_id,
                                    'target_type', target_type,
                                    'emojis', emojis,
                                    'reaction', reaction
                                )
                            ) as reactions
                        from
                            General_Reactions
                        where
                            target_type = 'photo'
                        group by
                            target_id
                        ) as gr
                    on
                        gr.target_id = pl.id
                    where 
                        pl.target_id = ? and pl.target_type = ?`;
        
        try {

            let [results] = await this.sql.query(query, requirements);

            req.body.results = results;
            req.body.message = "Successfully retrieved photo links";
            
            req.body.photos = results; //In case delete_photo_links is the next middleware
            
            next();

        } catch(err){

            console.log(query, err);

            res.json({result: [], message: "Error retrieving photo links"});

        }

    };
};

export default request;

