function request({sql, verify_encrypted_password}) {

    this.req_path = "/logout";
    this.req_type = "get";

    //User will try to login with an email, and then it will try to create a session, if an existing session
    //already exists, then it will login with the existing sessions, else it will continue creating a new session
    this.callbacks = ["logout"];

    this.req = (req, res)=>{

        const item_to_be_cleared = ['session_id', 'id'];

        for(const item of item_to_be_cleared){

            res.clearCookie(item, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "lax",
                        path: "/"
                    });
        }

        res.end();

    };
}

export default request;