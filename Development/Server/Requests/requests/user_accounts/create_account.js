

function request(sql, s3, PutObjectCommand) {

    const Verify_Email = function(email){
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return emailRegex.test(email);
    };

    this.req_path = "/create_account";
    this.req_type = "post";
    this.callbacks = ["create_account"];
    
    this.req = async (req, res) => {
        
        let acc_details = req.body;

        let {email, password, first_name, last_name, date_of_birth, gender, marital_status} = acc_details;

        if(!Verify_Email(email)){
            res.json({message: "Invalid email format.", success: false, acc_info: null});
            return;
        }

        let created_on = Date.now();

        let query = `insert into User_Accounts(email, password, first_name, last_name, date_of_birth, gender, marital_status, created_on) values(?,?,?,?,?,?,?,?);`;

        
        try {

            let [result] = await this.sql.query(query, [email, password, first_name, last_name, date_of_birth, gender, marital_status, created_on]);

            acc_details.id = result.insertId;

            res.json({message: "Account successfully created.", success: true, acc_info: acc_details});
            
        } catch(err) {

            console.log(query, err.sqlMessage);

            res.json({message: "Error creating the account.", success: false, acc_info: null});

        }
    };
};

export default request;