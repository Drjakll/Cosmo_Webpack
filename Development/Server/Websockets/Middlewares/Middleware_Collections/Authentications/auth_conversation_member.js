let middleware = function({sql}){

    let check_for_private_conversation = async (conversation_id, user_id)=>{

        let query = `select 1 from Users_In_Private_Conversations where conversation_id = ? and user_id = ?`;

        let [result] = await sql.query(query, [conversation_id, user_id]);
        
        return result.length;

    }

    let check_for_public_conversation = async (public_channel_id, user_id) => {

        let query = `select 1 from Users_In_Public_Channels where public_channel_id = ? and user_id = ?`;

        let [result] = await sql.query(query, [public_channel_id, user_id]);

        return result.length
    }

    this.middleware = async (param, next) => {

        let {user_id, room_tag: conversation_id, private_or_public} = param;

        if(private_or_public === "private"){

            if(await check_for_private_conversation(conversation_id, user_id)){
                return next();
            }

        } else if(private_or_public === "public") {

            if(await check_for_public_conversation(conversation_id, user_id)){
                return next();
            }

        }


    };

};

export default middleware;