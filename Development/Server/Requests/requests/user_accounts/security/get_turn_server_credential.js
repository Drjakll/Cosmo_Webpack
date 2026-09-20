function request() {

    this.req_path = "/get_turn_server_credential";
    this.req_type = "get";
    this.callbacks = ["central_auth","get_turn_server_credential"];

    this.req = (req, res)=>{

        const turn_server_cred = {
            username: process.env.TURN_SERVER_USERNAME,
            credential: process.env.TURN_SERVER_PASSWORD
        }

        res.status(200).json({turn_server_cred});
    }

}

export default request;