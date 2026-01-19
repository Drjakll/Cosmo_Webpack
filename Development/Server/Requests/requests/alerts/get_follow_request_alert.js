let request = function () {


    this.req = async (req, res) => {

        let { user_id } = req.params;

        let data = [user_id];

        query = `select
                    ua.first_name as first_name,
                    ua.last_name as last_name,
                    ua.id as follower_id,
                    pl.link as profile_picture_link,
                    c.timestamp,
                    c.followed_id as self_id
                          
                from 
                    Connections as c

                left join 
                    User_Accounts as ua
                on
                    ua.id = c.follower_id and c.status = 'pending'

                left join
                    Photo_Links as pl
                on
                    pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1
                
                where 
                    c.followed_id = ?
            `;
        
        try {

            let [results] = await this.sql.query(query, data);

            res.json({message: "Successfully retrieved follow requests", results});

        } catch(err){

            console.log(query, err);

            res.json({message: "Error retrieving alerts", results: []});

        }
    };

};

export default request;


