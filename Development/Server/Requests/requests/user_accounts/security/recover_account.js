function request(sql, s3, PutObjectCommand) {

    this.req_path = '/recover_account';
    this.req_type = 'post';
    this.callbacks = ['recover_account', 'send_email'];

    this.req = async (req, res, next)=>{

        let {email} = req.body;

        let current_time = Date.now();

        let get_query = `select email, first_name, last_name, last_time_recovered, password from User_Accounts where email = ?`;

        try {

            let [results] = await sql.query(get_query, [email]);

            if(results.length === 0){

                res.json({message: "No account found with that email", failed: true});

                return;
                
            }


            let {first_name, last_name, last_time_recovered, password} = results[0];

            let seconds_since_last_recovery = Math.floor((current_time - last_time_recovered) / 1000);

            //Check if the last time recovered is less than 60 seconds ago
            if( seconds_since_last_recovery < 60){

                res.json({message: `Wait for ${60 - seconds_since_last_recovery} seconds before \nrecovering your account again`, failed: true});
                
                return;

            }


            //Query for setting the last time recovered to the current time
            let set_query = `update User_Accounts set last_time_recovered = ? where email = ?`;

            await sql.query(set_query, [current_time, email]);

            //Set the email message and response message for the next callback
            req.body.mail_message = `Hello ${first_name} ${last_name},\n\nYour Cosmo account password is: <b>${password}</b>`;
            req.body.response_msg = "Your account details have been sent to your email";
            
            next();

        } catch (error) {

            console.error("Error occurred while recovering account:", error);

            res.status(500).json({message: "Internal server error", failed: true});

        }

    };
};

export default request;