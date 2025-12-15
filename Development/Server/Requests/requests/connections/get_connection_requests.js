let request = function () {

    this.req = (req, res, next) => {

        let { request, status } = req.body;

        let query = `select * from Connection_Requests where (target_email='${request.email}' or from_email='${request.email}') and (request_status='${status}')`;

        this.sql.query(query, (err, result) => {

            if(err){
                
                console.log(query, err.sqlMessage);

                res.json({message: "Error retrieving connection requests", results: []});

                res.end();

            } else {

                let list_of_emails = [];

                for(let entry of result){

                    let {target_email, from_email} = entry;

                    let selected_email = from_email === request.email ? target_email : from_email;

                    list_of_emails.push(selected_email);
                }

                req.body.list_of_emails = list_of_emails;

                next();

            } 

        });
    };

};

export default request;


