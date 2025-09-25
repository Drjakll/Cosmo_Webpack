let request = function () {

    //Cache to temporarily store connection_requests json object to reduce database reads/writes syncronization issues
    this.temp_cache = {};

    this.req = (req, res, next) => {

        let { request_from, request_to, updated_conn_req_sent, alert_id } = req.body;

        let requirements = [
            {type: "string", key: "email", value: request_to.email, conjunc: "="}
        ];

        let query = this.generate_get_query("User_Accounts", requirements, ["connection_requests"]);
    

        this.sql.query(query, (err, result) => {

            if (err || result.length === 0) {

                console.log("No result found");
                res.end();
                return;

            } else {
                //If the connection_requests field for the user is not in the temp cache, then add it
                if(this.temp_cache[request_to.email] === undefined){

                    this.temp_cache[request_to.email] = JSON.parse(result[0].connection_requests || "{}");

                }
                
                let connection_requests = this.temp_cache[request_to.email];

                //If the user has already sent a connection request, then remove it (basically a toggle)
                if(connection_requests[request_from.email] !== undefined){

                    delete connection_requests[request_from.email];
                    
                } else {
                    //Otherwise, add the connection request

                    let {id, email, first_name, last_name} = request_from;
            
                    connection_requests[email] = {id, email, first_name, last_name, sent_on: new Date().toISOString()};
                }

                let jsonStr = JSON.stringify(connection_requests);
                
                query = `update User_Accounts set connection_requests = '${jsonStr}' where email = '${request_to.email}'`;

                this.sql.query(query, async (err, result) => {

                    if(err){

                        console.log(err.sqlMessage);

                        //If failed to update connection_requests, then revert the change in connection_requests object
                        delete connection_requests[email];

                        res.end();


                    } else {

                        let {id, first_name, last_name} = request_from;

                        let body = {
                            alert_type: "connection_request",
                            user_acc: request_to,
                            alert_data: {request_from_id: id, first_name: first_name, last_name: last_name},
                            updated_request_list: connection_requests
                        };

                        for(let key in body){

                            req.body[key] = body[key];

                        }
                        
                        if(next){
                            //Next middleware is update_alerts
                            next();
                        } else {
                            res.end();
                        }
                    }
                    
                    delete this.temp_cache[request_to.email];
                });
            }

        });
    };

};

export default request;


