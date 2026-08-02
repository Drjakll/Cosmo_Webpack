function request({sql}) {

    this.req_path = "/get_messages";
    this.req_type = "post";
    this.callbacks = ["central_auth","get_messages"];
    
    this.req = async (req, res) => {
        
        let {conversation_id, off_time_set, user_time_joined} = req.body;

        const {user_id} = req.auth;

        if(!user_id){
            return res.json({message: "Authentication required!", results: []});
        }

        if(conversation_id === null || off_time_set === null || user_time_joined === null){
            return res.json({message: "Missing required fields!", results: []});
        }

        off_time_set = parseInt(off_time_set);
        user_time_joined = parseInt(user_time_joined);

        if(isNaN(off_time_set) || isNaN(user_time_joined)){
            return res.json({message: "Invalid time values!", results: []});
        }

        let query = `
            select
                pm.*,
                ua.first_name as first_name,
                ua.last_name as last_name,
                pl.link as profile_picture_link
            from
                Private_Messages as pm
            
            left join
                User_Accounts as ua
            on
                ua.id = pm.sender_id
            
            left join
                Photo_Links as pl
            on
                pl.profile_id = ua.id and pl.is_a_cover = 1
            
            where
                pm.conversation_id = ? and
                pm.created_on < ? and
                pm.created_on >= ? and
                exists (                                          
                    select 1
                    from Users_In_Private_Conversations as uipc
                    where 
                        uipc.user_id = ? and
                        uipc.conversation_id = pm.conversation_id
                )
                order by pm.created_on 
                desc
                limit 25
            `;
        
        try {

            let [results] = await sql.query(query, [conversation_id, off_time_set, user_time_joined, user_id]);

            res.json({message: `Successfully retrieved ${results.length} messages`, results})

        } catch(err){

            console.log(query, err);

            res.json({message: "Error getting messages", results: []});
        }
       
    };
};

export default request;