import cookie from 'cookie';

let middleware = function({sql}){

    let check_for_auth = async (param, session_id, next) => {

        try {

            const [sessions] = await sql.query(
                `select 
                    user_id
                from 
                    User_Sessions
                where 
                    session_id = ?
                and 
                    expires_on > ?`,
                [session_id, Date.now()]
            );

            if(sessions.length){

                let {user_id} = sessions[0];

                param.user_id = user_id;
                param.session_id = session_id;

                return await next();

            } 

        } catch(err){

            console.log(err);

        }

        next(new Error("Authentication error"));
    }

    this.middleware = async (param, next) => {

        if(!param){
            return;
        }
        

        try {

            //Param could be just the socket itself or coming from other source which the param 
            //inside contains a socket and other contents
            let {cookie: cookies} = param?.socket?.handshake?.headers || param?.handshake.headers;
            
            if(typeof cookies !== "string"){
                return next(new Error("Cookie Error"));
            }

            const parsed_cookies = cookie.parse(cookies);

            const {session_id} = parsed_cookies;

            return await check_for_auth(param, session_id, next);

        } catch(err){

            console.log(err);

        }
        
    }

};

export default middleware;