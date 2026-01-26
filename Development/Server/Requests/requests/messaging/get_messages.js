function request() {
    
    this.req = async (req, res) => {
        
        let {conversation_id, created_on} = req.body;

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
                pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1
            
            where
                pm.conversation_id = ? and
                created_on <= ?
                limit 100
        `
        
        try {

            let [results] = await this.sql.query(query, [conversation_id, created_on]);

            res.json({message: `Successfully retrieved ${results.length} messages`, results})

        } catch(err){

            console.log(query, err);

            res.json({message: "Error getting messages", results: []});
        }
       
    };
};

export default request;