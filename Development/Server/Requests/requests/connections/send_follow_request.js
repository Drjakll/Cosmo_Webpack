let request = function ({sql}) {

    this.req_path = "/send_follow_request";
    this.req_type = "post";
    this.callbacks = ["send_follow_request"];

    let calculate_status = async (privacy, to_id, from_id) => {

        switch(privacy){
            case "public":
                return "accepted";

            case "mutual":

                //let data = [from_id, to_id];

                let data = [to_id, from_id ];

                let [mutual] = await this.sql.query(`
                    select 
                        count(*) as count 
                    from
                        Connections as A

                    join 
                        Connections as B

                    join
                        Connections as C
                    on
                        C.followed_id = B.follower_id

                    where 
                        (
                            B.followed_id = ?
                        and
                            A.followed_id = ?
                        )
                    and
                        (
                            (  
                                B.followed_id = A.follower_id 
                            and
                                A.status = 'accepted'
                            )
                        or
                            (
                                A.followed_id = C.follower_id
                            and
                                B.status = 'accepted'
                            and
                                C.status = 'accepted'
                            )
                        )
                `, data);

                if(mutual[0].count > 0){
                    return "pending";
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

            await sql.query(query, data); 

            switch(status){

                case 'rejected':

                    return res.status(401).json({message: "User set privacy to only mutual followers will be allow to request to follow. "});

                case 'pending':
                
                    return res.status(200).json({message: "Follow request has been sent!"});

                case 'accepted':

                    return res.status(200).json({message: "User has accepted your follow request!"});
            }

        } catch (err){

            console.log(err);

            res.status(500).json({message: "Error sending follow request!"});
        }
    };
};

export default request;