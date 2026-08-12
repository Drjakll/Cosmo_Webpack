let request = function ({sql}) {

    this.req_path = "/search_within_followers";
    this.req_type = "post";
    this.callbacks = ["search_within_followers"];

    let Build_Conditions = (req, data, self_account) => {

        let accountFields = [
            "first_name",
            "last_name",
        ];

        let absoluteFields = [
            "gender",
            "marital_status",
            "date_of_birth"
        ];

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
                    con.followed_id = ${self_account.id}
                and 
                    con.follower_id = ac.id
                and 
                    con.status = 'accepted'
            )`);

        return `where ac.id != ? and ${where.join(" and ")}`
        
    };

    this.req = async (req, res) => {

        let { requirements, self_account } = req.body;

        if(!self_account){
            res.status(400).json({message: "Missing self account information", results: []});
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
                            ac.personal_traits,
                            pl.link as profile_picture_link

                        from 
                            User_Accounts as ac

                        left join
                            Photo_Links as pl
                        on
                            pl.profile_id = ac.id and is_a_cover = true

                        ${sub_query}
                    `;

        try {

            let [results] = await sql.query(query, data);

            res.status(200).json({message: `Found ${results.length} results`, results});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error finding results", results: []});

        }
    };

};

export default request;


