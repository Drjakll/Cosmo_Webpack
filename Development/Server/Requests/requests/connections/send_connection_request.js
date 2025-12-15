let request = function () {

    this.req = (req, res, next) => {

        let { request_from, request_to } = req.body;

        let query = `insert into Connection_Requests (target_email, from_email) values('${request_to.email}', '${request_from.email}')`;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error sending connection request"});
  
            } else {

                req.body.owner = request_from;
                req.body.alert_data = {};
                req.body.type = "connection_request";
                req.body.id_ref = result.insertId;
                req.body.target = request_to.email;


                //The next should be add_new_alert
                next();

            }

        });
    };

};

export default request;


