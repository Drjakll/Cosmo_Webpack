let request = function () {

    let calculate_status = async (privacy, to_id, from_id) => {

        switch(privacy){
            case "public":
                return "accepted";

            case "mutual_only":

                let mutual = await this.sql.query(`
                    select 
                        count(*) as count 
                    from
                        Connections as A
                    join 
                        Connections as B
                    on 
                        A.followed_id = B.follower_id
                    where 
                        A.follower_id = ${from_id}
                    and 
                        B.followed_id = ${to_id};
                `);

                if(mutual[0].count > 0){
                    return "accepted";
                } else {
                    return "rejected";
                }

            case "private":
                return "pending";
        }

    };

    this.req = async (req, res)=>{

        let { from_id, id: to_id, user_account_info: to_account_info } = req.body;

        let now = Date.now();

        let { privacy } = to_account_info;

        let status = await calculate_status(privacy, to_id, from_id);

        let query = `
            insert into Connections (follower_id, followed_id, time_stamp, status) values(${from_id}, ${to_id}, ${now}, "${status}");
        `;

        this.sql.query(query, (err, result) => {

            if(err){

                console.log(query, err.sqlMessage);
                res.json({message: "Error sending follow request"});
                
            } else {
                res.json({message: "Successfully sent follow request!"});
            }

            res.end();

        }); 
    };
};

export default request;