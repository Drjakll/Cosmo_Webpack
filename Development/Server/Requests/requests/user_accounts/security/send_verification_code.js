function request({sql}) {

    this.req_path = '/send_verification_code';
    this.req_type = 'post';
    this.callbacks = ['send_verification_code', 'send_email'];

    let generate_code = (n) => {

        let code = "";

        for(let i = 0; i < n; i++){

            let random_num = Math.floor(Math.random() * 26) + 65;

            code += String.fromCharCode(random_num);

        }

        return code;

    }

    this.req = async (req, res, next)=>{

        let {id, email} = req.body;

        let code = generate_code(6);

        let query = `update User_Accounts set verification_code = ? where id = ? and email = ?`;

        try {

            let [result] = await sql.query(query, [code, id, email]);

            if(result.affectedRows === 0){

                res.status(404).json({message: "Error sending verification code", failed: true});

                return;

            }

            req.body.mail_message = `The verification code for your Cosmo account is: <b>${code}</b>`;
            req.body.response_msg = "A verification code has been sent to your email";

            next();

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error sending verification code", failed: true});

        }

    };
};

export default request;