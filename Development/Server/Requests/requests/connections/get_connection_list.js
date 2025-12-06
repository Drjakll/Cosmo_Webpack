let request = function () {

    this.req = (req, res, next = null) => {

        let { list_of_emails } = req.body;

        if(list_of_emails.length === 0){
            req.body.connection_list = [];
            next();
            return;
        }

        let query = `select * from User_Accounts where `;

        for(let entry of list_of_emails){

            query += `email = '${entry}' or `;

        }

        query = query.slice(0, -4);

        this.sql.query(query, (err, result) => {

            if(err){

                console.log(err.sqlMessage);
                res.json({message: "Error retrieving connection list", results: []});
                res.end();

            } else {

                req.body.connection_list = result;
                req.body.results = result;

                next();
            }

        });
    };

};

export default request;


