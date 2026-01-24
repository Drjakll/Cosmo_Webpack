let request = function() {
    
    this.req = async (req, res, next) => { 
        
        let {user_id, start, end, id} = req.body;

        //If id exists, that means just find one post, else search the posts within the date range
        let data = id ? [user_id, id] : [user_id, start, end];
        
        let query = `select 
                        pd.*,
                        coalesce(c.cc, 0) as comments_count
                    from
                        Post_Data as pd
                    left join 
                        (select
                            target_id,
                            count(*) as cc
                        from
                            Comments
                        where 
                            target_type = 'post'
                        group by
                            target_id
                        ) as c
                    on
                        c.target_id = pd.id

                    where pd.user_id = ?
                    ${
                        id ?
                        `and id = ? `
                        :
                        `
                        and pd.created_on >= ?
                        and pd.created_on < ?
                        `
                    }
                    order by pd.created_on asc`;
        
        try{
            let [results] = await this.sql.query(query, data);
            
            req.body.targets = results;
            req.body.target_type = 'post'

            //Next should be getting the general reactions
            next();

        } catch(err){

            console.log(err);

            res.json({message: "Error retrieving post(s)", posts: []});
        }

    };
};

export default request;
