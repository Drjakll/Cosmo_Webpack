

function request({sql, verify_encrypted_password}) {

    this.req_path = "/login";
    this.req_type = "post";

    //User will try to login with an email, and then it will try to create a session, if an existing session
    //already exists, then it will login with the existing sessions, else it will continue creating a new session
    this.callbacks = [
        "login",
        "create_session",
        "login_with_session"
    ];

    let Get_Table_Subquery = (item_names, table_name, alias)=>{

        return `select json_arrayagg(
            json_object(
                ${item_names.map((name, i)=>{

                    return `'${name}', ${alias}.${name}`

                }).join(',')}
            )
        )
        from 
            ${table_name} as ${alias}
        where
            ${alias}.id = ua.id
        `

    }

    let get_acc_data = [
        "id",
        "password",
        "email",
        "date_of_birth",
        "first_name",
        "last_name",
        "marital_status",
        "gender",
        "mood_today",
        "email_verified",
        "personal_traits",
        "privacy",
        "created_on",
        "last_mood_updated"
    ]
    
    this.req = async (req, res, next) => {
        
        let {email, password}= req.body;

        let {session_id, id} = req.cookies;

        if(!session_id && !password){
            return res.json({message: "No credentials found", acc_info: null, status: 0b010})
        }

        let data = password ? [email] : [id];

        let query = `
            select 
                ua.${get_acc_data.join(", ua.")},
                coalesce(pl.link, '')  as profile_picture_link,
                pl.id as profile_picture_id,

                coalesce((${Get_Table_Subquery([
                    "id",
                    "hobby_name",
                    "proficiency",
                    "story",
                    "start_date",
                    "privacy"
                ], "User_Hobbies", "uh")}
                ), json_array()) as User_Hobbies,
                coalesce((${Get_Table_Subquery([
                    "id",
                    "city",
                    "state",
                    "country",
                    "start_date",
                    "end_date",
                    "location_type",
                    "privacy"
                ], "User_Locations", "ul")}
                ), json_array()) as User_Locations,
                coalesce((${Get_Table_Subquery([
                    "id",
                    "city",
                    "state",
                    "country",
                    "start_date",
                    "end_date",
                    "school_name",
                    "school_type",
                    "privacy"
                ], "User_Schools", "us")}
                ), json_array()) as User_Schools,
                coalesce((${Get_Table_Subquery([
                    "id",
                    "profession_name",
                    "proficiency",
                    "start_date",
                    "privacy"
                ], "User_Professions", "up")}
                ), json_array()) as User_Professions
            
            from 
                User_Accounts as ua

            left join 
                Photo_Links as pl
            on 
                pl.profile_id = ua.id and pl.is_a_cover = 1

            where 
                ${password ? "ua.email = ?" : "ua.id = ?"}
        `;

        try { 
            let [result] = await sql.query(query, data);

            if(!result.length){

                return res.json({message: "No account matches with the email and/or password", acc_info: null, status: 0b010});

            }

            req.body.acc_info = result[0];

            //If a session_id exists, then go ahead and proceed to create_session 
            //and create_session will see that it has a session_id and so it will log in with the session_id
            if(session_id && !password){
                next();
                return;
            }
            
            //Otherwise, see if the it matches with the password
            const password_matches = await verify_encrypted_password(password, result[0].password);


            if(!password_matches) {

                return res.json({message: "No account matches with the email and/or password", acc_info: null, status: 0b010});

            } 

            const to_be_cleared = ["session_id", "id"]


            for(let item_to_be_cleared of to_be_cleared){

                res.clearCookie(item_to_be_cleared, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/"
                });

            }

            delete req.cookies.session_id;
            delete req.cookies.id;

            //If password exists and the password matches then it will proceed to creating a session_id and get rid of the old 
            //session_id if it exists
            next();

        } catch(err){

            console.log(query, err);

            res.status(404).json({message: "Error retreiving user account", acc_info: null, status: 0b001});
        }
    };
};

export default request;