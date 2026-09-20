let middleware = function({sql}){

    const get_acc_data = [
        "id",
        "first_name",
        "last_name",
        "gender",
        "mood_today",
        "personal_traits",
        "privacy"
    ];

    const acc_data_privacy = [
        "marital_status as marital_status_privacy",
        "date_of_birth as date_of_birth_privacy"
    ];


    this.middleware = async (param, next) => {

        let {user_id: id, socket} = param;

        let query = `
            select 
                ua.${get_acc_data.join(", ua.")},
                udps.${acc_data_privacy.join(", udps.")},
                coalesce(pl.link, '')  as profile_picture_link,
                pl.id as profile_picture_id
            
            from 
                User_Accounts as ua

            left join 
                Photo_Links as pl
            on 
                pl.profile_id = ua.id and pl.is_a_cover = 1

            left join
                User_Data_Privacy_Settings as udps
            on
                udps.user_id = ua.id

            where 
                ua.id = ?
        `;       

        try {

            let [results] = await sql.query(query, [id]);

            if(!results.length){

                return await next(new Error("Account information not found"));

            } else {

                socket.user_info = results[0];

                param.user_info = results[0];

            }

        } catch(err){

            console.log(err);

            return await next(new Error("Server error"));

        }


        await next();
    }

};

export default middleware;