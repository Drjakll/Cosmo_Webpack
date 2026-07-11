let request = function ({sql}) {

    this.req_path = "/get_alerts";
    this.req_type = "post";
    this.callbacks = ["get_alerts"];

    this.req = async (req, res) => {

        let { user_account } = req.body;

        let {id} = user_account;

        let data = [id];

        query = `select
                      coalesce(follower_accounts.info_array, json_array()) as followers_pending
                        
                from Connections as c

                left join Connections as c2
                on
                    c2.status = 'pending' and c2.followed_id = c.followed_id

                left join 
                    (select 
                        ua.id,
                        json_arrayagg(
                            json_object(
                                'id', ua.id,
                                'first_name', ua.first_name,
                                'last_name', ua.last_name,
                                'profile_picture_link', pl.link
                            )
                        ) as info_array
                    from User_Accounts as ua
                    left join Photo_Links as pl
                    on
                        ua.id = pl.target_id and pl.is_a_cover = 1 and pl.target_type = 'profile'
                    group by
                        ua.id
                    ) as follower_accounts
                on
                    follower_accounts.id = c2.follower_id
                
                where 
                    c.followed_id = ?
            `;
        
        try {

            await  sql.query(query, data);

        } catch(err){

            console.log(err);

            res.json({message: "Error retrieving alerts", results: []});

        }
    };

};

export default request;


