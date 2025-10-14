let request = function () {

    this.req = (req, res, next) => {

        let { alert_id } = req.body;

        let query = `delete from User_Alerts where id = ${alert_id}`;

        this.sql.query(query, (err, result) => {

            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error deleting alert"});
            } else {
                res.json({message: "Successfully deleted alert!"});
            }

            res.end();

        });
    };

};

export default request;


