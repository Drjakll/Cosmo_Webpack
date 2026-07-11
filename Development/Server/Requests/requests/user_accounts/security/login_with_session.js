function request({sql}) {

    //This route should not be accessible by the frontend directly
    this.req_path = '/rfasdfavzvcsfzdvzxcvcvrfasdfwqerqwerqwerasdfcvzxcvzvzxcv123234234sdfasdf';
    this.req_type = 'post';
    this.callbacks = ['login_with_session'];

    this.req = async (req, res, next)=>{


        let {acc_info, session_id, server_password} = req.body;

        //The password is on the .env file
        if(server_password !== process.env.SERVER_PASSWORD){
            res.end();
            return;
        }



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
                        and
                            user_agent = ?
                        and
                            ip_address = ?
                    `;

        try {

            let [result] = await sql.query(query, data);

            if(result.affectedRows === 0){

                return res.json({message: "Login session has expired", acc_info: null, status: 0b001});

            } else {

                acc_info.session_id = session_id;

                return res.json({message: "Successfully logged in", acc_info, status: 0b100})

            }

        } catch(err){

            console.log(err);

            return res.json({message: "Error logging in", acc_info: null, status: 0b001});

        }   

    };
};

export default request;