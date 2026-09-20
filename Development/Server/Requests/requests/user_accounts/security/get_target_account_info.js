function request({sql}){

    this.req_path = null;
    this.req_type = null;
    this.callbacks = [];

    this.req = async (req, res, next) => {

        const { target_id } = req.body;

        if (!target_id) {
            return res.status(400).json({
                message: "Missing target id"
            });
        }

        const [results] = await sql.query(
            `select * from User_Accounts where id = ?`,
            [target_id]
        );

        if (!results.length) {
            
            return res.status(401).json({
                message: "No target account found"
            });
        }

        req.target = results[0];

        next();

    };

}

export default request;