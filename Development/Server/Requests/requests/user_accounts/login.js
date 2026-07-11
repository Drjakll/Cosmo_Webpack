

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
        
        let {email, password, session_id}= req.body;

        let data = [email];

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
                        ua.verification_code,
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
        `;



        try { 
            let [result] = await sql.query(query, data);

            if(!result.length){

                return res.json({message: "No account matches with the email and password", acc_info: null, status: 0b10});

            }

            req.body.acc_info = result[0];
            req.body.server_password = process.env.SERVER_PASSWORD; //this is needed to grant access to the next middleware

            //If a session_id exists, then go ahead and proceed to logging in with the session_id
            if(session_id){
                next();
                return;
            }
            
            //If no session_id, then it will check to see if the password matches, if not, it will not even proceed to create
            //a session_id
            if(!verify_encrypted_password(password, result[0].password)) {

                return res.json({message: "No account matches with the email and password", acc_info: null, status: 0b010});

            } 

            //If no session_id exists and the password matches then it will proceed to creating a session_id
            next();

        } catch(err){

            console.log(query, err);

            res.json({message: "Error retreiving user account", acc_info: null, status: 0b001});
        }
    };
};

export default request;