let request = function() { 

    this.req = async (req, res)=>{

        let {target_type, target_id, reply_to_id, offset_timestamp} = req.body;

        let query = `select 
                        c.*,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        pl.link as profile_picture_link,
                        coalesce(r.user_reactions, json_array()) as user_reactions
                    from 
                        Comments as c

                    join
                        User_Accounts as ua
                    on
                        c.user_id = ua.id

                    left join
                        Photo_Links as pl
                    on
                        pl.target_type = "profile" and pl.target_id = ua.id and pl.is_a_cover = true

                    left join 
                        (select 
                            target_id,
                            target_type,
                            json_arrayagg(
                                json_obj(
                                    'id', id,
                                    'emojis', emojis,
                                    'reaction', reaction
                                )
                            ) as user_reactions
                        from
                            Reactions
                        group by 
                            target_id
                        ) as r
                    on
                        r.target_id = c.id and r.target_type = "comments"

                    where 
                        c.target_type = ? and
                        c.target_type = ? and
                        c.reply_to_id = ? and 
                        c.time_stamp > ?
                    order by
                        c.time_stamp desc
                    limit = 10
                    `;

        try {

            let [results] = await this.sql.query(query, [target_type, target_id, reply_to_id, offset_timestamp]);

            res.json({message: "Successfully retrieved replies", results, failed: false});

        } catch(err){

            console.log(err);

            res.json({message: "Error retrieving replies", results: [], failed: true});
        }

    };
}

export default request;