function request(sql, s3, PutObjectCommand) {

    this.req_path = "/get_conversations";
    this.req_type = "post";
    this.callbacks = ["get_conversations"];

    this.req = async (req, res)=>{

        let {user} = req.body; 

        let {id} = user;

        let data = [id];

        

        let query = `
                    select 
                        all_users.*,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        pl.link as profile_picture_link
                    from
                        Users_In_Private_Conversations as all_users

                    join 
                        (select 
                            u.*
                        from
                            Users_In_Private_Conversations as u
                        where 
                            user_id = ?
                        ) as target_user
                    
                    join
                        User_Accounts as ua
                    on
                        ua.id = all_users.user_id
                    left join
                        Photo_Links as pl
                    on
                        pl.profile_id = ua.id and pl.is_a_cover = 1

                    where
                        target_user.conversation_id = all_users.conversation_id
                    `;

        try {

            let [results] = await this.sql.query(query, data);

            res.json({message: `Successfully found ${results.length} results`, results});

        }catch(err){

            console.log(query, err);

            res.json({message: "Error fetching conversations", results: []});
        } 

    };

};

export default request;