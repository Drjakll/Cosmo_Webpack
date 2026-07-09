let request = function (sql, s3, PutObjectCommand) {

    this.req_path = "/get_mutual_recommendations/:id/:offset_id";
    this.req_type = "get";
    this.callbacks = ["get_mutual_recommendations"];

    this.req = async (req, res)=>{

        let { id: user_id, offset_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                message: 'Missing id',
                results: [],
            });
        }

        let data = [user_id, offset_id, user_id, user_id];

        let query = `
            select 
                ua.*,
                pl.link as profile_picture_link,
                count(distinct c.followed_id) as mutual_count

            from Connections as c

            join Connections as b
                on b.follower_id = c.followed_id
                and b.status = 'accepted'

            join User_Accounts as ua
                on ua.id = b.followed_id

            left join Photo_Links as pl
                on 
                    pl.profile_id = ua.id
                and 
                    pl.is_a_cover = 1

            where 
                c.follower_id = ?
                and ua.id > ?
                and c.status = 'accepted'
                and b.followed_id != ?
                and not exists (
                    select 1
                    from Connections x
                    where x.follower_id = ?
                    and x.status = 'accepted'
                    and x.followed_id = b.followed_id
                )

            group by ua.id
            having count(distinct c.followed_id) > 1
            order by ua.id asc
            limit 5;
        `;

        try {

            let [results] = await this.sql.query(query, data);
            
            res.json({message: `Found ${results.length} recommendations`, results});

        } catch(err){

            console.log(query, err);

            res.json({message: `Found error retrieving recommendations`, results: []});

        }
    };
};

export default request;