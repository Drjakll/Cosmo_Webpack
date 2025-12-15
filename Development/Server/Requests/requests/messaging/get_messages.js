function request() {
    
    this.req = (req, res) => {
        
        let {id, created_on} = req.body;

        let query = `
            select 
                ua.first_name,
                ua.last_name,
                ua.profile_picture_link,
                ua.email,
                t.text,
                t.conversation_id,
                t.created_on
            from
                User_Accounts as ua
            join
                (
                    select
                        mi.*
                    from
                        Message_Index as mi
                    where
                        mi.conversation_id = ${id} and created_on < ${created_on}
                        order by mi.created_on desc
                        limit 10
                ) as t
            on
                t.sender_email = ua.email
            order by t.created_on asc
        `;
        
        this.sql.query(query, (err, data) => {
            
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "An error occured while retrieving messages", results: []});
            } else {
                res.json({message: "Successfully retrieved messages", results: data});
            }
            
            res.end();
        });
       
    };
};

export default request;