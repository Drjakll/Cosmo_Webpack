let request = function () {

    this.req = (req, res)=>{

        let { id: user_id } = req.body;

        let query = `
            select 
                ua.* 
            from 
                Connections as c
            join
                User_Accounts as ua
            where 
                c.followed_id = ${user_id} 
            and 
                c.follower_id = ua.id
        `;

        this.sql.query(query, (err, results) => {

            if(err){

                console.log(query, err.sqlMessage);
                res.json({message: "Error retrieving followers list", results: []});

            } else {

                res.json({message: "Successfully retrieved followers list", results: results});

            }

            res.end();

        });
    };
};

export default request;