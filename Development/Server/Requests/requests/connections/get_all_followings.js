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
                c.follower_id = ${user_id} 
            and 
                c.followed_id = ua.id
        `;

        this.sql.query(query, (err, results) => {

            if(err){

                console.log(query, err.sqlMessage);
                res.json({message: "Error retrieving followings list", results: []});

            } else {

                res.json({message: "Successfully retrieved followings list", results: results});
            }

            res.end();  

        });
    };
};

export default request;