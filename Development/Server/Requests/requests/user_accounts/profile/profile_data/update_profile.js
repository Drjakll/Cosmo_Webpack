let request = function () {
    
    this.req = async (req, res) => { 
        
        let { to_update, credentials } = req.body;

        let {password, id} = credentials;

        if(Object.keys(to_update).length === 0 || !password || !id){
            res.end();
            return;
        }
        
        let query = `update User_Accounts set ? where password = ? and id = ?`;
                                                
        try {

            await this.sql.query(query, [to_update, password, id]);
            
        }catch(err){

            console.log(query, err);
        }

        res.end();

    };
};

export default request;

