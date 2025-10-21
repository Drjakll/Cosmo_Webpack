let request = function () {

    let gather_group = (query, connection_list)=>{

        query += "("

        for(let connection of connection_list){

            query += `owner_email = '${connection.email}' or `;

        }

        query = query.slice(0, -4) + ") ";

        return query;
    }

    this.req = (req, res) => {

        let { connection_list, request, status } = req.body;

        let query = `select * from User_Alerts where `;

        if(connection_list.length < 1){

            res.json({message: "No results found", results:[]});
            res.end();
            return;

        } 
        else {

            query = gather_group(query, connection_list);

            query += " and ";

            query += status === "pending" ?  
            `(target_only = '${request.email}' )` :  
            `(target_only = '${request.email}' or target_only = 'everyone' or target_only = 'connection_list')`;
        
        }

        query += " order by time_created desc";
        
        this.sql.query(query, (err, results) => {

            if(err){
                console.log(err.sqlMessage);
                res.json({message: "Error retrieving alerts", results: []});
            } else {
                res.json({message: `Successfully retrieved ${results.length} alerts!`, results: results});
            }

            res.end();

        });
    };

};

export default request;


