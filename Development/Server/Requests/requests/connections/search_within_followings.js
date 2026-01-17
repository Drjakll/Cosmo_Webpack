let request = function () {

    let Build_Conditions = (req, data, self_account) => {

        let accountFields = [
            "first_name",
            "last_name",
        ];

        let absoluteFields = [
            "gender",
            "marital_status",
            "date_of_birth"
        ]

        let related = {
            User_Hobbies: {
                table: "User_Hobbies",
                alias: "uh",
                filter_fields: ["hobby_name", "story"],
                exact_fields: ["start_date", "proficiency"]
            },
            User_Locations: {
                table: "User_Locations",
                alias: "ul",
                filter_fields: ["city", "state", "country"],
                exact_fields: ["start_date", "end_date", "location_type"]
            },
            User_Professions: {
                table: "User_Professions",
                alias: "up",
                filter_fields: ["profession_name"],
                exact_fields: ["start_date", "proficiency"]
            },
            User_Schools: {
                table: "User_Schools",
                alias: "us",
                filter_fields: ["school_name", "school_type", "city", "country"],
                exact_fields: ["start_date", "end_date"]
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

        // Exact match
        for(let field of absoluteFields){
            if (req[field]) {
                where.push(`ac.${field} = ?`);
                data.push(req[field]);
            }
        }

        // EXISTS filters
        for (let key in related) {

            if (!req[key]) 
                continue;

            let { table, alias, filter_fields, exact_fields } = related[key];
            let sub = [`${alias}.user_id = ac.id`];

            for (let f of filter_fields) {
                if (req[key][f]) {
                    sub.push(`${alias}.${f} like ?`);
                    data.push(`%${req[key][f]}%`);
                }
            }

            for (let f of exact_fields) {
                if (req[key][f]) {
                    sub.push(`${alias}.${f} = ?`);
                    data.push(req[key][f]);
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

        where.push(`
            exists (
                select 1
                from 
                    Connections as con
                where 
                    con.follower_id = ${self_account.id}
                and 
                    con.followed_id = ac.id
                and 
                    con.status = 'accepted'
            )`);

        return `where ac.id != ? and ${where.join(" and ")}`
        
    };

    this.req = async (req, res) => {

        let { requirements, self_account } = req.body;

        if(!self_account){
            res.json({message: "Missing self account information", results: []});
            return;
        }

        let data = [self_account.id];

        let sub_query = Build_Conditions(requirements, data, self_account);

        let query = `select ac.id,
                            ac.first_name,
                            ac.last_name,
                            ac.gender,
                            ac.marital_status,
                            ac.date_of_birth,
                            ac.privacy,
                            pl.link as profile_picture_link,

                            coalesce(fc.following_count, 0) as following_count,
                            coalesce(frc.followers_count, 0) as followers_count,

                            coalesce(fc.following_ids, json_array()) as following_ids,
                            coalesce(frc.follower_ids, json_array()) as follower_ids,
                            
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
                            (select
                                follower_id,
                                json_arrayagg(followed_id) as following_ids,
                                count(*) as following_count
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
                                json_arrayagg(follower_id) as follower_ids,
                                count(*) as followers_count
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


