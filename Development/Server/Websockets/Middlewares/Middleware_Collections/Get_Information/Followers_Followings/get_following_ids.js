let middleware = function({sql}){

    this.middleware = async (params, next)=>{

        let {user_id} = params;

        let data = [user_id];

        let query = `
            select 
                *
            from 
                Connections

            where 
                follower_id = ? and status = 'accepted'
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