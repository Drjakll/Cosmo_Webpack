let request = function() {
    
    this.req = async (req, res) => { 
        
        let {user_id, date_interval} = req.body;

        let {start, end} = date_interval;

        let data = [user_id, start, end]
        
        let query = `select 
                        pd.*,
                        coalesce(c.cc, 0) as comments_count
                    from
                        Post_Data as pd
                    left join 
                        (select
                            target_type,
                            target_id,
                            count(*) as cc
                        from
                            Comments
                        group by
                            target_id
                        ) as c
                    on
                        c.target_id = pd.id and c.target_type = "post"
                    where pd.user_id = ?
                    and pd.created_on >= ?
                    and pd.created_on < ?
                    order by pd.created_on asc`;

        
        try{
            let [results] = await this.sql.query(query, data);

            res.json({message: `Successfully retrieved ${results.length} posts`, posts: results})

        } catch(err){

            console.log(err);

            res.json({message: "Error retrieving post(s)", posts: []});
        }

    };
};

export default request;
