let request = function ({sql}) {

    this.req_path = "/find_connections";
    this.req_type = "post";
    this.callbacks = ["find_connections"];

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
            not exists (
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
            res.status(400).json({message: "Missing self account information", results: []});
            return;
        }

        if(isNaN(parseInt(self_account.id))){
            self_account.id = 0;
        }

        let data = [self_account.id];

        let sub_query = Build_Conditions(requirements, data, self_account);

        let query = `select 
                        ac.id as id,
                        ac.first_name as first_name,
                        ac.last_name as last_name,
                        ac.gender as gender,
                        ac.marital_status as marital_status,
                        ac.date_of_birth as date_of_birth,
                        ac.personal_traits as personal_traits,
                        ac.privacy as privacy,
                        pl.link as profile_picture_link
                    from
                        User_Accounts as ac
                        
                    left join 
                        Photo_Links as pl
                    on
                        pl.profile_id = ac.id and pl.is_a_cover = 1

                    ${sub_query}
                    `;

        try {

            let [results] = await sql.query(query, data);

            res.status(200).json({message: `Found ${results.length} results`, results});

        } catch(err){

            console.log(err);

            res.status(500).json({mnessage: "Error finding results", results: []});

        }
    };

};

export default request;


