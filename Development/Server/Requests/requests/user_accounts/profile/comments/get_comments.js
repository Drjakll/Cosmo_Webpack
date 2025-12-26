let request = function() {
    
    
    this.req = (req, res) => { 
        
        let {target_id, target_type, offset_timestamp} = req.body;
 
        
        let query = `select 
                        c.*,
                        pl.link,
                        ua.first_name,
                        ua.last_name
                        json_arrayagg(
                            json_object(
                                'emojis', r.emojis,
                                'reaction', r.reaction
                            )
                        ) as user_reaction
                    from 
                        Comments as c
                    join
                        User_Accounts as ua
                    on
                        c.user_id = ua.id
                    left join
                        Photo_Links as pl
                    on
                        pl.target_id = ua.id and pl.target_type = 'profile' and is_a_cover = true
                    left join 
                        Reactions as r
                    on
                        r.target_id = c.id and r.target_type = 'comment'
                    where 
                        c.target_id = ${target_id}
                        c.target_type = '${target_type}'
                        c.time_stamp > ${offset_timestamp}
                    order by time_stamp asc
                    limit 20
                    `;
        
        this.sql.query(query, (err, result)=>{
           
            if(err){
                console.log(query, err.sqlMessage);
                res.json({message: "Error retrieving comments", comments: []});
            } else {
                res.json({message: `Successfully retrieved ${result.length} comments`, comments: result});
            }
            
            res.end();
            
        });
                
    };
};

export default request;

