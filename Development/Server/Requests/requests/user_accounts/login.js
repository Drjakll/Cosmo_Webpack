function request() {
    
    this.req = async (req, res, next) => {
        
        let {email, password}= req.body;

        let data = [email, password];

        let query = `select 
                        ua.id,
                        ua.first_name,
                        ua.last_name,
                        ua.marital_status,
                        ua.gender,
                        ua.date_of_birth,
                        ua.email,
                        ua.created_on,
                        ua.password,
                        ua.privacy,
                        pl.link as profile_picture_link,
                        pl.id as profile_picture_id,

                        coalesce(fc.following_ids, json_array()) as following_ids,
                        coalesce(frc.follower_ids, json_array()) as follower_ids,

                        json_array() as User_Hobbies,
                        json_array() as User_Locations,
                        json_array() as User_Schools,
                        json_array() as User_Professions
                    
                    from 
                        User_Accounts as ua

                    left join 
                        Photo_Links as pl
                    on 
                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1

                    left join
                        (select
                            follower_id,
                            json_arrayagg(followed_id) as following_ids
                        from
                            Connections
                        where
                            status = 'accepted'
                        group by
                            follower_id
                        ) as fc
                    on
                        fc.follower_id = ua.id

                    left join
                        (select
                            followed_id,
                            json_arrayagg(follower_id) as follower_ids
                        from
                            Connections
                        where
                            status = 'accepted'
                        group by
                            followed_id
                        ) as frc
                    on
                        frc.followed_id = ua.id

                    where 
                        ua.email = ? and ua.password = ?
        `;

        try { 
            let [result] = await this.sql.query(query, data);

            if(!result.length){
                return res.json({message: "No account matches with the email and password", acc_info: null, status: 0b10});
            }

            req.body.acc_info = result[0];
            req.body.table_names = ["User_Hobbies", "User_Locations", "User_Schools", "User_Professions"];
            req.body.at_index = 0;
            req.body.table_name = "User_Hobbies";
            req.body.user_id = result[0].id;

            
            next();

        } catch(err){

            console.log(query, err);

            res.json({message: "Error retreiving user account", acc_info: null, status: 0b01});
        }
    };
};

export default request;