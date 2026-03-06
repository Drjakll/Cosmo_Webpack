function request() {
    
    this.req = async (req, res) => {
        
        let acc_details = req.body;

        let {email, password} = acc_details;


        
        let query = `insert into User_Accounts(email, password) values(?,?);`;
        
        try {

            let [result] = await this.sql.query(query, [email, password]);

            acc_details.id = result.insertId;

            res.json({message: "Account successfully created.", success: true, acc_info: acc_details});
            
        } catch(err) {

            console.log(query, err.sqlMessage);

            res.json({message: "Error creating the account.", success: false, acc_info: null});

        }
    };
};

export default request;