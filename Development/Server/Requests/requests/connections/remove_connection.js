let request = function () {

    this.req = (req, res, next) => {

        let { email, to_remove_email } = req.body;

        let query = `select connection_list from User_Accounts where email = '${email}'`;

        this.sql.query(query, (err, result)=>{

            if(err){

                console.log(err.sqlMessage);
                res.json({});
                res.end();

            } else if(result.length === 0) {

                console.log("No user with email " + email + " found.");
                res.json({});
                res.end();

            } else {

                let connection_list = JSON.parse(result[0].connection_list || "{}");

                delete connection_list[to_remove_email];
                
                query = `update User_Accounts set connection_list = '${JSON.stringify(connection_list)}' where email = '${email}'`;

                this.sql.query(query, (err, result)=>{

                    if(err){

                        console.log(err.sqlMessage);
                        res.json({});
                        res.end();

                    } else if (next) {

                        //Remove the connection for the opposing account
                        req.body.email = to_remove_email;
                        req.body.to_remove_email = email;

                        next();

                    } else {
                        console.log("ended");
                        res.json({});
                        res.end();

                    }

                });

            }

        });
        
    };

};

export default request;


