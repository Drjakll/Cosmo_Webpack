let request = function(){
    
    this.req = async (req, res)=>{
        
        let {email, password} = req.body;
        
        let query = `select ac.id,
                            ac.password,
                            ac.first_name,
                            ac.last_name,
                            ac.gender,
                            ac.marital_status,
                            ac.date_of_birth,
                            ac.email,
                            ac.privacy,
                            pl.link as profile_picture_link,
                            
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
                                (select * 
                                from User_Hobbies order by start_date desc) uh
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
                                (select * 
                                from User_Locations order by start_date desc) ul
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
                                (select * 
                                from User_Professions order by start_date desc) up
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
                                        'city', city,
                                        'state', state,
                                        'country', country,
                                        'start_date', start_date,
                                        'end_date', end_date,
                                        'school_type', school_type,
                                        'privacy', privacy
                                    )
                                ) as User_Schools
                            from
                                (select * 
                                from User_Schools order by start_date desc) us
                            group by
                                user_id
                            ) as schools   
                        on
                            schools.user_id = ac.id 

                        left join
                            Photo_Links as pl
                        on
                            pl.target_id = ac.id and is_a_cover = true

                        where 
                            ac.email = ? and ac.password = ?
                    `;

        try {

            let [result] = await this.sql.query(query, [email, password]);

            if(result.length === 0){

                res.json({message: "Email and password don't match.", acc_info: null, status: 0b10});

            } else {
                console.log(result);
                res.json({message: "Login successfully", acc_info: result[0], status: 0b11});

            }

        }catch(err){

            console.log(query,err);

            res.json({message: "Error logging in.", acc_info: null, status: 0b01});
        }
    
    };
    
};

export default request;


