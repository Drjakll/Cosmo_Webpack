let request = function ({sql}) {

    this.req_path = "/update_profile";
    this.req_type = "patch";
    this.callbacks = ["central_auth","update_profile"];
    
    this.req = async (req, res) => { 
        
        let { to_update, credentials } = req.body;

        let {id} = credentials;

        if(Object.keys(to_update).length === 0 || isNaN(parseInt(id))){
            res.json({message: "No information has changed", success: 0});
            return;
        }
        
        let query = `update User_Accounts set ? where id = ?`;
                                                
        try {

            await sql.query(query, [to_update, id]);
            res.json({message: "Successfully updated the account", success: 1});
            
        }catch(err){

            console.log(query, err);
            res.json({message: "Error while updating", success: 0});
        }

    };
};

export default request;

