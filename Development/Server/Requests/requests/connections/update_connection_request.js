let request = function () {

    this.req = (req, res, next) => {

        let { request_from, request_to, status } = req.body;

        let query = `update Connection_Requests set request_status = '${status}' where target_email='${request_to.email}' and from_email='${request_from.email}'`;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error updating connection request status"});
            } else {
                res.json({message: "Successfully updated connection request status!"});
            }

            res.end();

        });
    };

};

export default request;


