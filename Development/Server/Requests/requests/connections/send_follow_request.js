let request = function () {

    let calculate_status = async (privacy, to_id, from_id) => {

        switch(privacy){
            case "public":
                return "accepted";

            case "mutual":

                let data = [from_id, to_id];

                let [mutual] = await this.sql.query(`
                    select 
                        count(*) as count 
                    from
                        Connections as A

                    join 
                        Connections as B
                    on 
                        A.followed_id = B.follower_id

                    where 
                        A.follower_id = ?
                    and 
                        B.followed_id = ?
                    and
                        A.status = 'accepted'
                    and
                        B.status = 'accepted'
                `, data);

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

        let { from_id, to_account_info } = req.body;

        let now = Date.now();

        let { privacy, id } = to_account_info;

        let status = await calculate_status(privacy, id, from_id);

        let data = [from_id, id, now, status];

        let query = `
            insert into 
                Connections (follower_id, followed_id, timestamp, status) 
                values(?,?,?,?)
            on duplicate key
            update
                timestamp = values(timestamp),
                status = case 
                    when 
                        status = 'pending' then 'rejected'
                    else
                        values(status)
                end
        `;

        try {

            await this.sql.query(query, data); 

            res.json({message: "Successfully sent follow request!"});

        } catch (err){

            console.log(err);

            res.json({message: "Error sending follow request!"});
        }
    };
};

export default request;