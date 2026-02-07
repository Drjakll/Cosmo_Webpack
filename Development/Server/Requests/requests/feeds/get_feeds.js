let request = function(){

    this.req = async (req, res)=>{

        let {user_ids} = this.req.query;

        if(user_ids === ""){
            res.json({message: "No results", results: []});
            return;
        }    
        
        let users = user_ids !== "" ? user_ids.split(",") : [];

        let query = `select * from Feeds where user_id in (?) order by created_on desc`;

        try {

            let [results] = await this.sql.query(query, users);

            res.json({message: `Found ${results.length} feeds`, results});

        } catch(err){

            console.log(query, err);

            res.json({message: "Error while retrieving feeds", results: null});

        }

    };

};

export default request;