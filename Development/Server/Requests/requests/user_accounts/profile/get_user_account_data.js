let request = function(){
    
    this.req = async (req, res)=>{
        
        let {id} = req.params;
        
        let query = `select ac.id,
                            ac.first_name,
                            ac.last_name,
                            ac.gender,
                            ac.marital_status,
                            ac.date_of_birth,
                            ac.email,
                            ac.privacy,
                            ac.mood_today,
                            ac.last_mood_updated,
                            ac.personal_traits,
                            pl.link as profile_picture_link,
                            pl.id as profile_picture_id,

                            coalesce(fcp.pending, json_array()) as pending_follow_requests,
                            coalesce(fc.following_ids, json_array()) as following_ids,
                            coalesce(frc.follower_ids, json_array()) as follower_ids,
                            json_array()  as User_Hobbies,
                            json_array()  as User_Locations,
                            json_array()  as User_Professions,
                            json_array() as User_Schools

                        from 
                            User_Accounts as ac

                        left join
                            (select
                                follower_id,
                                json_arrayagg(followed_id) as following_ids
                            from
                                Connections
                            where
                                status = 'accepted'
                            group by
                                follower_id
                            ) as fc
                        on
                            fc.follower_id = ac.id

                        left join
                            (select
                                followed_id,
                                json_arrayagg(follower_id) as follower_ids
                            from
                                Connections
                            where
                                status = 'accepted'
                            group by
                                followed_id
                            ) as frc
                        on
                            frc.followed_id = ac.id

                        left join
                            (select
                                followed_id,
                                json_arrayagg(follower_id) as pending
                            from
                                Connections
                            where
                                status = 'pending'
                            group by
                                followed_id
                            ) as fcp
                        on
                            fcp.followed_id = ac.id

                        left join
                            Photo_Links as pl
                        on
                            pl.target_id = ac.id and is_a_cover = true and pl.target_type = 'profile'

                        where 
                            ac.id = ?
                    `;

        try {

            let [result] = await this.sql.query(query, [id]);

            if(result.length === 0){

                res.json({message: "Account not found!", result: null});

            } else {

                res.json({message: "Account found!", result: result[0]});

            }

        }catch(err){

            console.log(query,err);

            res.json({message: "Error looking up account", result: null});
        }
    
    };
    
};

export default request;


