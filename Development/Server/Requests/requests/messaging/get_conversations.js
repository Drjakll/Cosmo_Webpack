function request() {

    this.req = async (req, res)=>{

        let {user} = req.body; 

        let {id} = user;

        let data = [id];

        

        let query = `
                    select 
                        users.*
                    from
                        Users_In_Private_Conversations as users
                    where
                        user_id = ?
                    `;

        try {
            let [results] = await this.sql.query(query, data);

            console.log(results);

            res.json({message: `Successfully found ${results.length} results`, results});

        }catch(err){
            console.log(query, err);

            res.json({message: "Error fetching conversations", results: []});
        } 

    };

};

export default request;