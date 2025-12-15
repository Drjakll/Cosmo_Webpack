let request = function () {

    this.req = (req, res, next) => {

        let { request_from, request_to } = req.body;

        let query = `delete from Connection_Requests where (target_email='${request_to.email}' and from_email='${request_from.email}') or (target_email='${request_from.email}' and from_email='${request_to.email}')`;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error removing connection request"});
            } else {
                res.json({message: "Successfully removed connection request!"});
            }

            res.end();

        });
    };

};

export default request;


