let request = function () {

    this.req = async (req, res)=>{

        let { id: user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                message: 'Missing user_id',
                results: [],
            });
        }

        let data = [user_id, user_id, user_id];

        let query = `
            select 
                ua.*,
                pl.link as profile_picture_link

            from 
                Connections as c

            join
                (
                    select 
                        count(b.follower_id) as counts,
                        b.follower_id,
                        b.status
                    from
                        Connections as b
                ) as mutual
            on
                mutual.follower_id = c.followed_id 
            and 
                mutual.status = 'accepted'

            join
                User_Accounts as ua
            on
                c.followed_id = ua.id

            left join
                Photo_Links as pl
            on
                pl.target_type = 'profile' and pl.target_id = ua.id and pl.is_a_cover = 1

            where 
                c.follower_id = ? 
            and 
                c.status = 'accepted' 
            and 
                b.followed_id != ? 
            and 
                b.followed_id not in (
                    select 
                        followed_id
                    from 
                        Connections
                    where 
                        follower_id = ?
                    and 
                        status = 'accepted'
                )
        `;

        try {

            let [results] = await this.sql.query(query, data);

            console.log(results);
            
            res.json({message: `Found ${results.length} recommendations`, results});

        } catch(err){

            console.log(query, err);

            res.json({message: `Found error retrieving recommendations`, results: []});

        }
    };
};

export default request;