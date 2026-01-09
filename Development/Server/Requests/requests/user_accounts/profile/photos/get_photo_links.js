let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {target_id, target_type, id} = req.body;

        //If id exists, we just wanted to search one photo link, else search based off on target_id and target_type
        let requirements = id ? [id] : [target_id, target_type];
        
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
                            gr.target_id,
                            json_arrayagg(
                                json_object(
                                    'id', gr.id,
                                    'user_id', gr.user_id,
                                    'target_id', gr.target_id,
                                    'target_type', gr.target_type,
                                    'emojis', gr.emojis,
                                    'reaction', gr.reaction,
                                    'profile_picture_link', pl.link,
                                    'first_name', ua.first_name,
                                    'last_name', ua.last_name
                                )
                            ) as reactions

                        from
                            General_Reactions as gr

                        left join
                            User_Accounts as ua
                        on
                            ua.id = gr.user_id

                        left join
                            Photo_Links as pl
                        on
                            pl.target_type = 'profile' and pl.target_id = ua.id and pl.is_a_cover = 1

                        where
                            gr.target_type = 'photo' and gr.reaction is not null
                        group by
                            gr.target_id
                        ) as gr
                    on
                        gr.target_id = pl.id

                    where 
                        ${id ? "pl.id = ?" : "pl.target_id = ? and pl.target_type = ?"}`;
        
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

