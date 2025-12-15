let request = function () {

    this.req = async (req, res, next)=>{

        let { id } = req.body;

        let query = `
            select 
                c.*,
                ua.profile_picture_link,
                ua.first_name,
                ua.last_name
            from 
                Connections as c
            join
                User_Accounts as ua
            on 
                c.followed_id = ${id}
            where
                c.follower_id = ua.id
            and
                c.status = 'pending';   
        `;

        this.sql.query(query, (err, result) => {

            if(err){

                console.log(query, err.sqlMessage);
                res.json({message: "Error retreiving follow requests", result: []});
                
            } else {
                
                req.body.results = result;

                next();
            }

            res.end();
        });

    };
};

export default request;