

function request({sql, verify_encrypted_password}) {

    this.req_path = "/login";
    this.req_type = "post";

    //User will try to login with an email, and then it will try to create a session, if an existing session
    //already exists, then it will login with the existing sessions, else it will continue creating a new session
    this.callbacks = ["login",
        "create_session",
        "login_with_session"
    ];
    
    this.req = async (req, res, next) => {
        
        let {email, password}= req.body;

        let {session_id, id} = req.cookies;

        let data = [email, id];

        let query = `select 
                        ua.id,
                        ua.first_name,
                        ua.last_name,
                        ua.password,
                        ua.marital_status,
                        ua.gender,
                        ua.date_of_birth,
                        ua.email,
                        ua.created_on,
                        ua.password,
                        ua.privacy,
                        ua.mood_today,
                        ua.last_mood_updated,
                        ua.personal_traits,
                        ua.email_verified,
                        coalesce(pl.link, '')  as profile_picture_link,
                        pl.id as profile_picture_id,

                        json_array() as User_Hobbies,
                        json_array() as User_Locations,
                        json_array() as User_Schools,
                        json_array() as User_Professions
                    
                    from 
                        User_Accounts as ua

                    left join 
                        Photo_Links as pl
                    on 
                        pl.profile_id = ua.id and pl.is_a_cover = 1

                    where 
                        ua.email = ?
                        or 
                        ua.id = ?
        `;



        try { 
            let [result] = await sql.query(query, data);

            if(!result.length){

                return res.json({message: "No account matches with the email and/or password", acc_info: null, status: 0b10});

            }

            req.body.acc_info = result[0];
            req.body.server_password = process.env.SERVER_PASSWORD; //this is needed to grant access to the next middleware

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

            res.json({message: "Error retreiving user account", acc_info: null, status: 0b001});
        }
    };
};

export default request;