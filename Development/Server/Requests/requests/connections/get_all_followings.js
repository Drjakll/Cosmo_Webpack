let request = function () {

    this.req_path = "/get_all_followings";
    this.req_type = "post";
    this.callbacks = ["get_all_followings"];

    this.req = async (req, res)=>{

        let { id: user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                message: 'Missing user_id',
                results: [],
            });
        }
        
        let data = [user_id];

        let query = `
            select 
                ac.id,
                ac.first_name,
                ac.last_name,
                ac.gender,
                ac.marital_status,
                ac.date_of_birth,
                ac.privacy,
                ac.personal_traits,
                pl.link as profile_picture_link 
            from 
                Connections as c
                
            join
                User_Accounts as ac
            on
                c.followed_id = ac.id
            
            left join
                Photo_Links as pl
            on
                pl.target_type = 'profile' and pl.target_id = ac.id and pl.is_a_cover = 1

            where 
                c.follower_id = ? and status = 'accepted'
        `;

        try {

            let [results] = await this.sql.query(query, data);

            res.json({message: `Found ${results.length} followings`, results});

        } catch(err){

            console.log(err);

            res.json({message: `Found error retrieving followings`, results: []});

        }
    };
};

export default request;