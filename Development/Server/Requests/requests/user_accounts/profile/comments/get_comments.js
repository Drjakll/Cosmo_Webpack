let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {target_id, target_type, offset_timestamp, reply_to_id, limit, greater_or_less, asc_desc} = req.body;

        let data = [
            target_id,
            target_type,
            reply_to_id,
            offset_timestamp
        ];

        let query = `select 
                        c.*,
                        pl.link as profile_picture_link,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        coalesce(r.user_reactions, json_array()) as reactions,
                        coalesce(re.replies, json_array()) as replies
                    from 
                        Comments as c

                    join
                        User_Accounts as ua
                    on
                        c.user_id = ua.id

                    left join
                        Photo_Links as pl
                    on
                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1

                    left join 
                        (select
                            reply_to_id,
                            json_arrayagg(
                                json_object(
                                    'id', id,
                                    'user_id', user_id,
                                    'comment', comment,
                                    'time_stamp', time_stamp,
                                    'target_type', target_type,
                                    'target_id', target_id,
                                    'reply_to_id', reply_to_id
                                )
                            ) as replies
                        from Comments 
                        where 
                            reply_to_id is not null
                        group by
                            reply_to_id
                        ) as re
                    on
                        re.reply_to_id = c.id
                        
                    left join 
                        (select 
                            cr.target_id as target_id,
                            json_arrayagg(
                                json_object(
                                    'id', cr.id,
                                    'user_id', user.id,
                                    'first_name', user.first_name,
                                    'last_name', user.last_name,
                                    'profile_picture_link', pic.link,
                                    'emojis', cr.emojis,
                                    'reaction', cr.reaction
                                )
                            ) as user_reactions
                        from 
                            Comment_Reactions as cr

                        left join
                            User_Accounts as user
                        on 
                            cr.user_id = user.id

                        left join
                            Photo_Links as pic
                        on
                            pic.target_id = user.id and pic.target_type = 'profile' and pic.is_a_cover = 1

                        where 
                            cr.reaction is not null

                        group by
                            cr.target_id

                        ) as r
                    on
                        r.target_id = c.id

                    where 
                        c.target_id = ? and
                        c.target_type = ? and
                        c.reply_to_id ${reply_to_id ? "=" : "is"} ? and
                        c.time_stamp ${greater_or_less} ?
                    order by time_stamp ${asc_desc}
                    limit ${limit ?? 25}
                    `;
        try {

            let [results] = await this.sql.query(query, data);

            res.json({message: `Successfully retrieved ${results.length} comments`, results, failed: false});

        } catch(err){

            console.log(query, err);

            res.json({message: `Error retrieving comments`, results: [], failed: true});
        }
                
    };
};

export default request;

