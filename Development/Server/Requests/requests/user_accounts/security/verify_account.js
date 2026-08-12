function request({sql}) {

    this.req_path = '/verify_account/:email/:code';
    this.req_type = 'get';
    this.callbacks = ['verify_account'];

    this.req = async (req, res)=>{

        let {email, code} = req.params;

        let query = `update User_Accounts set email_verified = 1 where email = ? and verification_code = ?`;

        try {

            let [result] = await sql.query(query, [email, code]);

            if(result.affectedRows === 0){

                res.status(404).json({message: "Error verifying account", failed: true});

                return;

            }
            
            res.status(200).json({message: "Successfully verified account", failed: false});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error verifying account", failed: true});

        }   

    };
};

export default request;