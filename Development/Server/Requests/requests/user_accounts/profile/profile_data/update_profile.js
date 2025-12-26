let request = function () {
    
    this.req = async (req, res) => { 
        
        let { to_update, credentials } = req.body;
        
        let query = `update User_Accounts set`;

        let place_holder = [];

        for(let key in to_update){

            query += ` ${key} = ?,`;

            place_holder.push(to_update[key]);
        }

        query = query.slice(0, -1) + " where";

        for(let key in credentials){

            query += ` ${key} = ? and`;

            place_holder.push(credentials[key]);
        }

        query = query.slice(0, -4);



                                                
        try {

            await this.sql.query(query, place_holder);
            
        }catch(err){

            console.log(query, err);
        }

        res.end();

    };
};

export default request;

