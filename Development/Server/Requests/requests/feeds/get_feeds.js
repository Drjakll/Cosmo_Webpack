let request = function(){

    this.req = async (req, res)=>{

        let {user_ids, offset} = this.req.query;

        if(user_ids === ""){
            res.json({message: "No results", results: []});
            return;
        }    
        
        let users = user_ids !== "" ? user_ids.split(",") : [];

        let query = `select * 
                    from 
                        Feeds 
                    where 
                        user_id in (?) and created_on < ?
                    order by created_on desc
                    limit 5`;

        try {

            let [results] = await this.sql.query(query, [users, parseInt(offset)]);

            ///Return the feeds to the front end and they will retrieve each feed as they scroll down
            res.json({message: `Found ${results.length} feeds`, results});
            
        } catch(err){

            console.log(query, err);

            res.json({message: "Error while retrieving feeds", results: null});

        }

    };

};

export default request;