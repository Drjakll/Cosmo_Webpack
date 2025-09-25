let request = function () {

    //This is to temporarily store user's alerts json object to reduce database reads/writes syncronization issues
    this.temp_cache = {};

    this.req = (req, res, next) => {

        let { alert_type, user_acc, alert_data, alert_id } = req.body;

        let query = `select * from User_Accounts where email = '${user_acc.email}'`;
    

        this.sql.query(query, (err, result) => {

            if (err || result.length === 0) {

                console.log(err.sqlMessage);
                res.end();

            } else {

                if(this.temp_cache[user_acc.email] === undefined){

                    this.temp_cache[user_acc.email] = JSON.parse(result[0].alerts || "{}");

                } 

                let alerts = this.temp_cache[user_acc.email];

                //If the alert with alert_id already exists, then remove it (basically a toggle)
                if(alerts[alert_id]){

                    delete alerts[alert_id];

                } else {

                    let new_alert = {
                        type: alert_type,
                        data: alert_data
                    };

                    alerts[alert_id] = new_alert;
                }

                query = `update User_Accounts set alerts = '${JSON.stringify(alerts)}' where email = '${user_acc.email}'`;

                this.sql.query(query, (err, result) => {

                    let json_res = {
                            message: "",
                            updated_alerts: alerts
                        };
                    
                    //Also include all other fields in req.body in the response
                    for(let key in req.body){
                        json_res[key] = req.body[key];
                    }

                    if (err) {
                        
                        console.log(err.sqlMessage);

                    } else {

                        json_res.message = "Successfully updated alerts";
                        res.json(json_res);
                    }

                    delete this.temp_cache[user_acc.email];
                    res.end();
                });

            }

        });
    };

};

export default request;


