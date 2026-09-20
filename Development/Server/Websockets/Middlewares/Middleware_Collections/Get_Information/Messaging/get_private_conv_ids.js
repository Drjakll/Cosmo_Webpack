let middleware = function({sql}){


    //Middleware must be used after user_auth
    this.middleware = async (param, next) => {

        let {user_id} = param;

        let query = `
            select 
                conversation_id
            from
                Users_In_Private_Conversations
            where
                user_id = ?
        `;

        try {

            let [results] = await sql.query(query, [user_id]);

            param.private_conversations = results;

            next();

        } catch(err){

            console.log(err);

            next(new Error("Server error"));

        }
    }

};

export default middleware;