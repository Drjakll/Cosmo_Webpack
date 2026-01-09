let request = function() {
    
    this.req = async (req, res) => { 
        
        let {user_id, date_interval, id} = req.body;

        //date_interval might not exists if it only retrieve single post with id
        let {start, end} = date_interval || {start: 0, end: 0};

        //If id exists, that means just find one post, else search the posts within the date range
        let data = id ? [user_id, id] : [user_id, start, end];
        
        let query = `select 
                        pd.*,
                        coalesce(c.cc, 0) as comments_count,
                        coalesce(gr.reactions, json_array()) as reactions
                    from
                        Post_Data as pd
                    left join 
                        (select
                            target_id,
                            count(*) as cc
                        from
                            Comments
                        where 
                            target_type = 'post'
                        group by
                            target_id
                        ) as c
                    on
                        c.target_id = pd.id

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
                            gr.target_type = 'post' and gr.reaction is not null
                        group by
                            gr.target_id
                        ) as gr
                    on
                        gr.target_id = pd.id

                    where pd.user_id = ?
                    ${
                        id ?
                        `and id = ? `
                        :
                        `
                        and pd.created_on >= ?
                        and pd.created_on < ?
                        `
                    }
                    order by pd.created_on asc`;

        
        try{
            let [results] = await this.sql.query(query, data);
            
            res.json({message: `Successfully retrieved ${results.length} posts`, posts: results})

        } catch(err){

            console.log(err);

            res.json({message: "Error retrieving post(s)", posts: []});
        }

    };
};

export default request;
