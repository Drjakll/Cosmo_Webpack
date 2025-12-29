let request = function() {
    
    
    this.req = async (req, res) => { 
        
        let {target_id, target_type, offset_timestamp} = req.body;
 
        
        let query = `select 
                        c.*,
                        pl.link as profile_picture_link,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        ua.id as user_id,
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
                        pl.target_id = ua.id and pl.target_type = 'profile' and is_a_cover = true
                        
                    left join 
                        (select 
                            target_id,
                            target_type,
                            json_arrayagg(
                                json_object(
                                    'id', id,
                                    'emojis', emojis,
                                    'reaction', reaction
                                )
                            ) as user_reaction
                        from 
                            Reactions 
                        ) as r
                    on
                        r.target_id = c.id and r.target_type = 'comment'

                    where 
                        c.target_id = ${target_id}
                        c.target_type = '${target_type}'
                        c.time_stamp > ${offset_timestamp}
                    order by time_stamp asc
                    limit 20
                    `;
        try {

            let [results] = await this.sql.query(query);

            res.json({message: `Successfully retrieved ${results.length} comments`, results, failed: false});

        } catch(err){

            console.log(err);

            res.json({message: `Error retrieving comments`, results: [], failed: true});
        }
                
    };
};

export default request;

