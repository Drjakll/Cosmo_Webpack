function request() {
    
    this.req = (req, res) => {
        
        let {users} = req.body;

        let search_req = [
            {key: "users", value: users, type: "json", conjunc: "json_search", logical: ""}
        ];
        
        let query = this.generate_get_query("Messaging", search_req, "*");

        this.sql.query(query, (err, results) => {
        
            if(err){
                console.log(err.sqlMessage);
                res.json({message: `Error searching for conversations`, conversations: []});
            } else {
                res.json({message: `Found ${results.length} conversations`, conversations: results});
            }

            res.end();
        });
       
    };
};

export default request;