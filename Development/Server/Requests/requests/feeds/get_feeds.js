let request = function(sql, s3, PutObjectCommand){

    this.req_path = "/get_feeds";
    this.req_type = "post";
    this.callbacks = ["get_feeds"];

    this.req = async (req, res)=>{

        let {user_ids, offset} = req.body;

        if(user_ids.length === 0){
            res.json({message: "No results", results: []});
            return;
        }   


        let query = `select 
                        f.*,
                        ua.first_name as first_name,
                        ua.last_name as last_name,
                        ua.gender as gender,
                        pl.link as profile_picture_link
                    from 
                        Feeds as f 
                    join
                        User_Accounts as ua
                    on
                        ua.id = f.user_id

                    left join 
                        Photo_Links as pl
                    on
                        pl.profile_id = ua.id and pl.is_a_cover = 1

                    where 
                        f.user_id in (?) and f.created_on < ?
                    order by f.created_on desc
                    limit 2`;

        try {

            let [results] = await this.sql.query(query, [user_ids, parseInt(offset)]);


            ///Return the feeds to the front end and they will retrieve each feed as they scroll down
            res.json({message: `Found ${results.length} feeds`, results});
            
        } catch(err){

            console.log(query, err);

            res.json({message: "Error while retrieving feeds", results: null});

        }

    };

};

export default request;