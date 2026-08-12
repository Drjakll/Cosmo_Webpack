let request = function ({sql}) {

    this.req_path = "/get_follow_requests";
    this.req_type = "get";
    this.callbacks = ["get_follow_requests"];

    this.req = async (req, res)=>{

        let { user_id } = req.params;

        let data = [user_id];

        let query = `
            select 
                c.*,
                pl.link as profile_picture_link,
                ua.first_name,
                ua.last_name
            from 
                Connections as c

            join
                User_Accounts as ua
            on 
                c.follower_id = ua.id

            left join
                Photo_Links as pl
            on
                pl.profile_id = ac.id and pl.is_a_cover = 1

            where
                c.followed_id = ?
            and
                c.status = 'pending';   
        `;
        
        try {
            let [results] = sql.query(query, data);

            res.status(200).json({message: `Succesfully retrieved ${results.length} requests`, results});

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error retrieving follow requests"});
        }

    };
};

export default request;