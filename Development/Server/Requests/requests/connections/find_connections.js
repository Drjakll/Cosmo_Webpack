let request = function () {

    let Build_Conditions = (req, data) => {

        let accountFields = [
            "first_name",
            "last_name",
            "gender",
            "marital_status"
        ];

        let related = {
            user_hobbies: {
                table: "User_Hobbies",
                alias: "uh",
                fields: ["hobby_name", "story", "proficiency", "start_date"]
            },
            user_locations: {
                table: "User_Locations",
                alias: "ul",
                fields: ["city", "state", "country", "start_date", "end_date", "location_type"]
            },
            user_professions: {
                table: "User_Professions",
                alias: "up",
                fields: ["profession_name", "start_date", "proficiency"]
            },
            user_schools: {
                table: "User_Schools",
                alias: "us",
                fields: ["school_name", "school_type", "city", "country", "start_date", "end_date"]
            }
        };

        let where = [];

        // Account-level filters
        for (let field of accountFields) {
            if (req[field]) {
                where.push(`ac.${field} like ?`);
                data.push(`%${req[field]}%`);
            }
        }

        // Date (exact match)
        if (req.date_of_birth) {
            where.push(`ac.date_of_birth = ?`);
            data.push(req.date_of_birth);
        }

        // EXISTS filters
        for (let key in related) {

            if (!req[key]) 
                continue;

            let { table, alias, fields } = related[key];
            let sub = [`${alias}.user_id = ac.id`];

            for (let f of fields) {
                if (req[key][f]) {
                    sub.push(`${alias}.${f} like ?`);
                    data.push(`%${req[key][f]}%`);
                }
            }

            if (sub.length > 1) {
                where.push(`
                    exists (
                        select 1
                        from ${table} ${alias}
                        where ${sub.join(" and ")}
                    )
                `);
            }
        }

        return where.length ? `where ${where.join(" and ")}` : "";
        
    };

    this.req = async (req, res) => {

        let { requirements } = req.body;

        let data = [];

        let sub_query = Build_Conditions(requirements, data);

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


