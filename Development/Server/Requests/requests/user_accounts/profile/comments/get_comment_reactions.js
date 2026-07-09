let request = function(sql, s3, PutObjectCommand) {

    this.req_path = "/get_comment_reactions";
    this.req_type = "post";
    this.callbacks = ["get_comment_reactions"];
    
    this.req = async (req, res, next) => { 
        
        let {comments} = req.body;

        let data = [];

        for(let comment of comments){

            let {id} = comment;

            data.push(id);
        }

        if(!data.length){
            req.body.emojis = [];
            req.body.reply_to_ids = "";

            //Will call get_comments.js
            next();
            return;
        }

        let query = `select 
                        r.*,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        coalesce(pl.link, "") as profile_picture_link
                    from 
                        Reactions as r

                    join
                        User_Accounts as ua
                    on
                        r.user_id = ua.id

                    left join
                        Photo_Links as pl
                    on
                        pl.profile_id = ua.id and pl.is_a_cover = 1

                    where 
                        r.comment_id in (?)
                    `;
        try {

            let [results] = await this.sql.query(query, [data]);

            req.body.emojis = results;
            req.body.reply_to_ids = data;

            //Next move onto getting replies, which will call get_comments.js again
            next();

        } catch(err){

            console.log(query, err);

            res.json({message: `Error retrieving comments`, results: [], failed: true});
        }
                
    };
};

export default request;

