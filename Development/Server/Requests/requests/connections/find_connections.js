let request = function () {

    let Build_Account = (req, data)=>{

        let fields = [
            "first_name",
            "last_name",
            "gender",
            "marital_status",
            "date_of_birth"
        ];

        for(let field of fields){

            
        }

    };

    let Build_Object = (req, data, alias)=>{



    }

    this.req = async (req, res) => {

        let { requirements } = req.body;

        let data = [];

        let query = `select ac.id,
                            ac.first_name,
                            ac.last_name,
                            ac.gender,
                            ac.marital_status,
                            ac.date_of_birth,
                            ac.privacy,
                            pl.link as profile_picture_link,
                            
                            coalesce(user_hobbies.User_Hobbies, json_array()) as User_Hobbies,
                            coalesce(user_locations.User_Locations, json_array()) as User_Locations,
                            coalesce(user_professions.User_Professions, json_array()) as User_Professions,
                            coalesce(user_schools.User_Schools, json_array()) as User_Schools

                        from 
                            User_Accounts as ac

                        left join
                            (select 
                                user_id,
                                hobby_name,
                                story,
                                proficiency,
                                start_date,
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
                            ) as user_hobbies 
                        on
                            user_hobbies.user_id = ac.id

                        left join
                            (select 
                                user_id, 
                                city,
                                state,
                                country,
                                start_date,
                                end_date,
                                location_type,
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
                            ) as user_locations
                        on 
                            user_locations.user_id = ac.id

                        left join
                            (select 
                                user_id, 
                                profession_name,
                                start_date,
                                proficiency,
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
                            ) as user_professions
                        on
                            user_professions.user_id = ac.id

                        left join
                            (select
                                user_id,
                                school_name,
                                school_type,
                                city,
                                state,
                                country,
                                start_date,
                                end_date,
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
                            ) as user_schools   
                        on
                            user_schools.user_id = ac.id 

                        left join
                            Photo_Links as pl
                        on
                            pl.target_id = ac.id and is_a_cover = true and pl.target_type = 'profile'

                        ${Object.keys(requirements).length ? "where" : ""} 
                            ${sub_query}
                    `;

        try {

            let [results] = await this.sql.query(query, data);

            res.json({message: `Found ${results.length} results`, results});

        } catch(err){

            console.log(err);

            res.json({mnessage: "Error finding results", results: []});

        }
    };

};

export default request;


