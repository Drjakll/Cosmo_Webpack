let middleware = function({sql}){

    this.middleware = async (params, next)=>{

        let {user_id} = params;

        let data = [user_id];

        let query = `
            select 
                ua.id as id,
                ua.first_name as first_name,
                ua.last_name as last_name,
                pl.link as profile_picture_link
                
            from 
                Connections as c

            left join
                User_Accounts as ua

            on
                c.followed_id = ua.id

            left join
                Photo_Links as pl
            
            on
                pl.profile_id = c.followed_id and pl.is_a_cover = true

            where 
                c.follower_id = ? and c.status = 'accepted'
        `;

        try {

            let [results] = await sql.query(query, data);
            
            params.followings = results;

            return next();

        } catch(err){

            console.log(err);

        }
    };
}

export default middleware;