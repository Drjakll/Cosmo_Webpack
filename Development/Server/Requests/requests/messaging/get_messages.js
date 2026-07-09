function request(sql, s3, PutObjectCommand) {

    this.req_path = "/get_messages";
    this.req_type = "post";
    this.callbacks = ["get_messages"];
    
    this.req = async (req, res) => {
        
        let {conversation_id, off_time_set, user_time_joined} = req.body;

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
                pm.created_on >= ? 
                order by pm.created_on 
                desc
                limit 25
            `;
        
        try {

            let [results] = await this.sql.query(query, [conversation_id, off_time_set, user_time_joined]);

            res.json({message: `Successfully retrieved ${results.length} messages`, results})

        } catch(err){

            console.log(query, err);

            res.json({message: "Error getting messages", results: []});
        }
       
    };
};

export default request;