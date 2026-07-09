function request(sql, s3, PutObjectCommand) {

    this.req_path = "/login";
    this.req_type = "post";
    this.callbacks = ["login"];
    
    this.req = async (req, res, next) => {
        
        let {email, password}= req.body;

        let data = [email, password];

        let query = `select 
                        ua.id,
                        ua.first_name,
                        ua.last_name,
                        ua.marital_status,
                        ua.gender,
                        ua.date_of_birth,
                        ua.email,
                        ua.created_on,
                        ua.password,
                        ua.privacy,
                        ua.mood_today,
                        ua.last_mood_updated,
                        ua.personal_traits,
                        ua.email_verified,
                        ua.verification_code,
                        coalesce(pl.link, '')  as profile_picture_link,
                        pl.id as profile_picture_id,

                        json_array() as User_Hobbies,
                        json_array() as User_Locations,
                        json_array() as User_Schools,
                        json_array() as User_Professions
                    
                    from 
                        User_Accounts as ua

                    left join 
                        Photo_Links as pl
                    on 
                        pl.profile_id = ua.id and pl.is_a_cover = 1

                    where 
                        ua.email = ? and ua.password = ?
        `;

        try { 
            let [result] = await this.sql.query(query, data);

            if(!result.length){
                return res.json({message: "No account matches with the email and password", acc_info: null, status: 0b10});
            } else {
                return res.json({message: "Successfully retrieved account information", acc_info: result[0], status: 0b11})
            }

            /*
            req.body.acc_info = result[0];
            req.body.table_names = ["User_Hobbies", "User_Locations", "User_Schools", "User_Professions"];
            req.body.at_index = 0;
            req.body.table_name = "User_Hobbies";
            req.body.user_id = result[0].id;

            //next should be get_user_data_table.js
            next();*/

        } catch(err){

            console.log(query, err);

            res.json({message: "Error retreiving user account", acc_info: null, status: 0b01});
        }
    };
};

export default request;