let request = function () {

    this.req = (req, res, next) => {

        let { accept_user_acc, user_acc } = req.body;

        let query = `select connection_list from User_Accounts where email = '${user_acc.email}'`;

        this.sql.query(query, (err, result) => {

            if (err) {

                console.log(err.sqlMessage);
                res.end();

            } else if(result.length > 0) {

                let connection_list = JSON.parse(result[0].connection_list || "{}");

                let {id, email, first_name, last_name} = accept_user_acc;

                let new_connection = {id: parseInt(id), email, first_name, last_name}

                connection_list[accept_user_acc.email] = new_connection;

                query = `update User_Accounts set connection_list = '${JSON.stringify(connection_list)}' where email = '${user_acc.email}'`;

                this.sql.query(query, (err, result)=>{

                    if(err){

                        console.log(err.sqlMessage);
                        res.end();

                    } else if(next) {

                        req.body["request_from"] = accept_user_acc;
                        req.body["request_to"] = user_acc;

                        //Prepare to make the opposing account to accept the add as well
                        let temp = accept_user_acc;

                        req.body["accept_user_acc"] = user_acc;
                        req.body["user_acc"] = temp;

                        next();

                    } else {

                        res.end();

                    }
                })

            } else {

                res.end();

            }

        });
    };

};

export default request;


