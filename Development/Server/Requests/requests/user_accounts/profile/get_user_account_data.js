let request = function(){
    
    this.req = async (req, res)=>{
        
        let {id} = req.body;
        
        let query = `select ac.id,
                            ac.first_name,
                            ac.last_name,
                            ac.gender,
                            ac.marital_status,
                            ac.date_of_birth,
                            ac.email,
                            ac.privacy,
                            pl.link as profile_picture_link,
                            pl.id as profile_picture_id,
                            
                            coalesce(hobbies.User_Hobbies, json_array()) as User_Hobbies,
                            coalesce(locations.User_Locations, json_array()) as User_Locations,
                            coalesce(professions.User_Professions, json_array()) as User_Professions,
                            coalesce(schools.User_Schools, json_array()) as User_Schools

                        from 
                            User_Accounts as ac

                        left join
                            (select 
                                user_id,
                                json_arrayagg(
                                    json_object(
                                        'id', id,
                                        'hobby_name', hobby_name,
                                        'story', story,
                                        'proficiency', proficiency,
                                        'start_date', start_date,
                                        'privacy', privacy
                                    )
                                ) as User_Hobbies
                            from 
                                User_Hobbies
                            group by 
                                user_id
                            ) as hobbies 
                        on
                            hobbies.user_id = ac.id

                        left join
                            (select 
                                user_id, 
                                json_arrayagg(
                                    json_object(
                                        'id', id,
                                        'city', city,
                                        'state', state,
                                        'country', country,
                                        'start_date', start_date,
                                        'end_date', end_date,
                                        'location_type', location_type,
                                        'privacy', privacy
                                    )
                                ) as User_Locations
                            from
                                User_Locations
                            group by 
                                user_id
                            ) as locations
                        on 
                            locations.user_id = ac.id

                        left join
                            (select 
                                user_id, 
                                json_arrayagg(
                                    json_object(
                                        'id', id,
                                        'profession_name', profession_name,
                                        'start_date', start_date,
                                        'proficiency', proficiency,
                                        'privacy', privacy
                                    )
                                ) as User_Professions
                            from
                                User_Professions
                            group by
                                user_id
                            ) professions
                        on
                            professions.user_id = ac.id

                        left join
                            (select
                                user_id,
                                json_arrayagg(
                                    json_object(
                                        'id', id,
                                        'school_name', school_name,
                                        'school_type', school_type,
                                        'city', city,
                                        'state', state,
                                        'country', country,
                                        'start_date', start_date,
                                        'end_date', end_date,
                                        'privacy', privacy
                                    )
                                ) as User_Schools
                            from
                                User_Schools
                            group by
                                user_id
                            ) as schools   
                        on
                            schools.user_id = ac.id 

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


