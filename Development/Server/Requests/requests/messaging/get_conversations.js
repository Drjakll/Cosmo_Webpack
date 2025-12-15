function request() {

    this.req = (req, res)=>{

        let {user} = req.body; 

        let query = `
                    select
                        ua.first_name,
                        ua.last_name,
                        ua.profile_picture_link,
                        ua.email,
                        s.*
                    from
                        User_Accounts as ua
                    join
                        (select
                            r.*
                        from 
                            Conversation_Participants as r
                        join
                            (select 
                                cp.conversation_id
                            from 
                                Conversation_Participants as cp
                            where
                                cp.user_email = '${user.email}') as t
                        where
                            t.conversation_id = r.conversation_id) as s
                    where
                        s.user_email = ua.email
                    order by ua.first_name asc
                    `;

        this.sql.query(query, (err, data)=>{

            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error fetching conversations", results: []});
            } else {
                res.json({message: `Successfully found ${data.length} results`, results: data});
            }

            res.end();

        });

    };

};

export default request;