let request = function({sql}){
    
    //The difference between view_user_account_data.js vs get_user_account_data is that it needs to be checked account auth and 
    //if the viewer is blocked

    this.req_path = "/view_user_account_data";
    this.req_type = "post";
    this.callbacks = ["central_auth","is_user_blocked","check_for_following_privacy","view_user_account_data"];

    this.req = async (req, res, next)=>{
        
        let {target_id: id} = req.body;

        if(!id){
            res.status(400).json({message: "Missing user id", result: null});
            return;
        }

        let query = `select ac.id,
                            ac.first_name,
                            ac.last_name,
                            ac.gender,
                            ac.marital_status,
                            ac.date_of_birth,
                            ac.email,
                            ac.privacy,
                            ac.mood_today,
                            ac.last_mood_updated,
                            ac.personal_traits,
                            pl.link as profile_picture_link,
                            pl.id as profile_picture_id,

                            json_array() as User_Hobbies,
                            json_array() as User_Locations,
                            json_array() as User_Professions,
                            json_array() as User_Schools

                        from 
                            User_Accounts as ac

                        left join
                            Photo_Links as pl
                        on
                            pl.profile_id = ac.id and is_a_cover = true

                        where 
                            ac.id = ?
                    `;

        try {

            let [result] = await sql.query(query, [id]);

            if(result.length === 0){

                res.status(404).json({message: "Account not found!", result: null});

            } else {
                
                res.status(200).json({message: "Account found!", result: result[0]});

            }

        }catch(err){

            console.log(query,err);

            res.status(500).json({message: "Error looking up account", result: null});
        }
    
    };
    
};

export default request;


