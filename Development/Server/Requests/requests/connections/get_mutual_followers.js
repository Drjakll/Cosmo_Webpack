let request = function ({sql}) {

    this.req_path = "/get_mutual_followers/:target_id";
    this.req_type = "get";
    this.callbacks = ["central_auth","get_mutual_followers"];


    this.req = async (req, res) => {

        let { target_id } = req.params;
        let {user_id} = req.auth;

        if(!user_id || !target_id){
            res.status(400).json({message: "Missing user id and/or target id", mutuals: null});
        }

        let data = [user_id, target_id];

        let query = `
            select
                ua.id as id,
                pl.link as profile_picture_link,
                ua.first_name as first_name,
                ua.last_name as last_name,
                ua.privacy as privacy,
                c.status as status
            from 
                User_Accounts as ua
            left join
                Connections as c
            on
                c.followed_id = ?
            left join
                Connections as d
            on
                d.followed_id = ?
			left join
				Photo_Links as pl
			on
				pl.profile_id = ua.id and pl.is_a_cover = 1
            where
                c.follower_id = d.follower_id and ua.id = c.follower_id
        `;

        try {

            let [results] = await sql.query(query, data);

            res.status(200).json({message: `Successfully retrieved ${results.length} entries`, mutuals: results})

        } catch(err){

            console.log(err);

            res.status(500).json({message: "Error retrieving mutual followers", mutuals: null});
        }   

    };
}

export default request;