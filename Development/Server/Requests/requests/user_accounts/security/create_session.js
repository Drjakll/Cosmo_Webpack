import crypto from 'crypto';

function request({sql}) {

    //This route should not be accessible by the frontend directly
    this.req_path = null;
    this.req_type = null;
    this.callbacks = ['create_session', 'login_with_session'];

    const session_expire_days = 30;

    const session_expire_ms = session_expire_days * 24 * 60 * 60 * 1000;

    //This gets called only considered the user provided a correct account password or has a session_id
    this.req = async (req, res, next)=>{

        let {acc_info, server_password} = req.body;
        let {session_id} = req.cookies;

        //The password is on the .env file, nothing shall comes through other than from another middleware
        if(server_password !== process.env.SERVER_PASSWORD){
            res.json({message: "brick wall"});
            return;
        }

        //If session_id exists, then proceed to login_with_session
        if(session_id){
            next();
            return;
        }

        //If session_id doesn't exist, then proceed to creating a new one

        session_id = crypto.randomBytes(32).toString("hex");

        const {id: user_id} = acc_info;

        const userAgent = req.headers["user-agent"];

        let created_on = Date.now();

        let expires_on = created_on + session_expire_ms;

        let last_seen = created_on;

        const ip_address = req.ip;

        let data = [user_id, session_id, userAgent, created_on, expires_on, last_seen, ip_address];

        let query = `insert into User_Sessions(
                                    user_id,
                                    session_id,
                                    user_agent,
                                    created_on,
                                    expires_on,
                                    last_seen,
                                    ip_address
                                ) values (?,?,?,?,?,?,?) 
                                as new
                                on duplicate key update 
                                    session_id = new.session_id,
                                    user_agent = new.user_agent,
                                    created_on = new.created_on,
                                    expires_on = new.expires_on,
                                    last_seen = new.last_seen,
                                    ip_address = new.ip_address
                                `;
        
        try {

            await sql.query(query, data);

            res.cookie("session_id", session_id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: "/"
            });

            req.cookies.session_id = session_id;

            next();

        } catch(err){

            console.log(err);

            return res.json({message: "Error creating a session", acc_info: null, status: 0b001});
        }   

    };
};

export default request;