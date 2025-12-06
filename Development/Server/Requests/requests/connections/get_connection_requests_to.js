let request = function () {

    this.req = (req, res, next) => {

        let { request_to } = req.body;

        let query = `select * from Connection_Requests where target_email='${request_to.email}' and request_status='pending'`;

        this.sql.query(query, (err, result) => {

            if(err){
                
                console.log(err.sqlMessage);

                res.json({message: "Error retrieving connection requests", results: []});

                res.end();

            } else {

                let list_of_emails = [];

                for(let entry of result){
                    list_of_emails.push(entry.from_email);
                }

                req.body.list_of_emails = list_of_emails;
                req.body.results = list_of_emails;

                next();

            } 

        });
    };

};

export default request;


