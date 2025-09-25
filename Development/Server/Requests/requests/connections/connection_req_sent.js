let request = function () {

    this.req = (req, res, next) => {

        let { request_from, request_to } = req.body;

        let query = `select conn_req_sent from User_Accounts where email = '${request_from.email}'`;

        this.sql.query(query, (err, result) => {

            if (err) {

                console.log(err.sqlMessage);
                res.end();
                return;
                
            } else {

                let conn_req_sent = JSON.parse(result[0].conn_req_sent || "{}");

                let {id, email, first_name, last_name} = request_to;

                let alert_id = Date.now();

                if (conn_req_sent[email]) {

                    //If the connection request has already been sent, then remove it (basically a toggle)
                    alert_id = conn_req_sent[email].alert_id; //Get the alert_id of the opposing user's alert for this connection request, in order to remove it in update_alerts
                    delete conn_req_sent[email];

                } else {

                    //alert_id is used to identify the opposing user's alert for this connection request, in order to remove it if needed
                    conn_req_sent[email] = {id, email, first_name, last_name, sent_on: new Date().toISOString(), alert_id};
                }

                let jsonStr = JSON.stringify(conn_req_sent);

                query = `update User_Accounts set conn_req_sent = '${jsonStr}' where email = '${request_from.email}'`;

                this.sql.query(query, (err, result) => {

                    if (err) {

                        console.log(err.sqlMessage);
                        res.end();
                        return;

                    } else {

                        req.body["alert_id"] = alert_id;
                        req.body["updated_conn_req_sent"] = conn_req_sent;

                        if(next){
                            //Next middlewarre is connection_request
                            next();
                        } else {
                            res.end();
                        }
                    
                    }

                });
            }

        });
    };

};

export default request;


