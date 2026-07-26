function central_auth({sql}){

    this.req_path = null;
    this.req_type = null;
    this.callbacks = ['central_auth'];

    this.req = async (req, res, next) => {

        const { session_id } = req.cookies;

        if (!session_id) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const [sessions] = await sql.query(
            `SELECT user_id
            FROM User_Sessions
            WHERE session_id = ?
            AND expires_on > ?`,
            [session_id, Date.now()]
        );

        if (!sessions.length) {
            return res.status(401).json({
                message: "Session expired"
            });
        }

        req.auth = {
            user_id: sessions[0].user_id
        };

        next();

    };

}

export default central_auth;