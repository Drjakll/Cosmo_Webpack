let request = function({sql}) {

    this.req_path = "/get_posts";
    this.req_type = "post";
    this.callbacks = ["get_posts", "get_reactions"];
    
    this.req = async (req, res, next) => { 
        
        let {user_id, start, end, id} = req.body;

        //If id exists, that means just find one post, else search the posts within the date range
        let data = id ? [user_id, id] : [user_id, start, end];

        let query = `select 
                        pd.*,
                        (select count(*) from Photo_Links where post_id = pd.id) as photos_count,
                        (select count(*) from Comments where post_id = pd.id) as comments_count
                    from
                        Post_Data as pd

                    where pd.user_id = ?
                    ${
                        id ?
                        `and pd.id = ? `
                        :
                        `
                        and pd.created_on >= ?
                        and pd.created_on < ?
                        `
                    }
                    order by pd.created_on asc`;
        
        try{
            let [results] = await sql.query(query, data);
            
            req.body.targets = results;
            req.body.target_id_type = 'post_id'

            //Next should be getting the reactions
            next();

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error retrieving post(s)", posts: []});
        }

    };
};

export default request;
