let request = function (sql, s3, PutObjectCommand) {

    this.req_path = "/update_profile";
    this.req_type = "patch";
    this.callbacks = ["update_profile"];
    
    this.req = async (req, res) => { 
        
        let { to_update, credentials } = req.body;

        let {password, id} = credentials;

        if(Object.keys(to_update).length === 0 || !password || isNaN(parseInt(id))){
            res.json({message: "Credentials not found", success: 0});
            return;
        }
        
        let query = `update User_Accounts set ? where password = ? and id = ?`;
                                                
        try {

            await this.sql.query(query, [to_update, password, id]);
            res.json({message: "Successfully updated the account", success: 1});
            
        }catch(err){

            console.log(query, err);
            res.json({message: "Error while updating", success: 0});
        }

    };
};

export default request;

