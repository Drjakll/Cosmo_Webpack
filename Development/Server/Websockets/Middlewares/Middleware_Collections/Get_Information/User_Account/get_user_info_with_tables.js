let middleware = function({sql}){

    const Get_Table_Subquery = (item_names, table_name, alias)=>{

        return `select json_arrayagg(
            json_object(
                ${item_names.map((name, i)=>{

                    return `'${name}', ${alias}.${name}`

                }).join(',')}
            )
        )
        from 
            ${table_name} as ${alias}
        where
            ${alias}.user_id = ua.id
        `;

    };

    const get_acc_data = [
        "id",
        "date_of_birth",
        "first_name",
        "last_name",
        "marital_status",
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
                pl.id as profile_picture_id,

                coalesce((${Get_Table_Subquery([
                    "id",
                    "hobby_name",
                    "proficiency",
                    "story",
                    "start_date"
                ], "User_Hobbies", "uh")}
                ), json_array()) as User_Hobbies,
                coalesce((${Get_Table_Subquery([
                    "id",
                    "city",
                    "state",
                    "country",
                    "start_date",
                    "end_date",
                    "location_type"
                ], "User_Locations", "ul")}
                ), json_array()) as User_Locations,
                coalesce((${Get_Table_Subquery([
                    "id",
                    "city",
                    "state",
                    "country",
                    "start_date",
                    "end_date",
                    "school_name",
                    "school_type"
                ], "User_Schools", "us")}
                ), json_array()) as User_Schools,
                coalesce((${Get_Table_Subquery([
                    "id",
                    "profession_name",
                    "proficiency",
                    "start_date"
                ], "User_Professions", "up")}
                ), json_array()) as User_Professions
            
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

            if(results.length){

                socket.user_info = results[0];

                param.user_info = results[0];

            } else {
                
                return await next(new Error("No account info found"));
            }

        } catch(err){

            console.log(err);

            return await next(new Error("Server error"));

        }


        await next();
    }

};

export default middleware;