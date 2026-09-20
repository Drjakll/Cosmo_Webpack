function request({sql}){

    this.req_path = "/set_user_data_privacy";
    this.req_type = "post";
    this.callbacks = ["central_auth","set_user_data_privacy"];

    let allowed_data_name = [
        "date_of_birth",
        "marital_status"
    ];

    this.req = async (req, res)=>{

        let {privacy, data_name} = req.body;
        let {user_id} = req.auth;

        if(!privacy){
            return res.status(400).json({message: "Missing privacy value"});
        }

        if(!allowed_data_name.includes(data_name)){
            return res.status(400).json({message: "Invalid data name"});
        }

        let query = `insert into User_Data_Privacy_Settings (user_id, ${data_name})
                    values (?,?)
                    on duplicate key update ${data_name} = ?`;

        let data = [user_id, privacy, privacy];

        try {

            await sql.query(query, data);

            res.status(200).json({message: "Privacy setting updated successfully"});

        } catch (error) {

            console.error(error);

            res.status(500).json({message: "Internal server error"});   

        }
    }
}

export default request;