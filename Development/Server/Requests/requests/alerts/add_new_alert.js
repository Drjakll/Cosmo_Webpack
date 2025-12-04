let request = function () {

    let alert_types = {
        photo_comment: "photo_comments_id_ref",
        connection_request: "connection_request_id_ref",
    };

    this.req = (req, res) => {

        let { owner, alert_data, type, id_ref, target} = req.body;

        let query = `insert into User_Alerts (owner_email, alert_data, alert_type, ${alert_types[type]}, target_only) values('${owner.email}', '${JSON.stringify(alert_data || {})}', '${type}', ${id_ref}, '${target}')`;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error adding new alert"});
            } else {
                res.json({message: "Request added new alert!"});
            }

            res.end();

        });
    };

};

export default request;


