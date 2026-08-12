function request({sql}) {

    //This route should not be accessible by the frontend directly
    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];

    this.req = async (req, res, next)=>{

        const {acc_info} = req.body;
        const {session_id} = req.cookies;



        const {id: user_id} = acc_info;

        const userAgent = req.headers["user-agent"];

        let now = Date.now();

        const ip_address = req.ip;


        let data = [now, session_id, user_id, now, userAgent, ip_address];

        let query = `update User_Sessions 
                        set
                            last_seen = ?
                        where
                            session_id = ?
                        and
                            user_id = ?
                        and
                            expires_on > ?
                    `;
        try {

            let [result] = await sql.query(query, data);

            if(result.affectedRows === 0){

                return res.status(401).json({message: "Login session has expired", acc_info: null, status: 0b001});

            } else {

                let to_add_to_cookie = {id: String(user_id)};

                const maxAge = 30 * 24 * 60 * 60 * 1000;

                for(let key in to_add_to_cookie){

                    res.cookie(key, to_add_to_cookie[key], {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        maxAge,
                        path: "/"
                    });

                }

                delete acc_info.password;

                return res.status(200).json({message: "Successfully logged in", acc_info, status: 0b100})

            }

        } catch(err){

            console.log(err);

            return res.status(500).json({message: "Error logging in", acc_info: null, status: 0b001});

        }   

    };
};

export default request;