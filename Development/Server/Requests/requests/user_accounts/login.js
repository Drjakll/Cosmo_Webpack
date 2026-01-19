function request() {
    
    this.req = async (req, res) => {
        
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
                        pl.link as profile_picture_link,

                        json_array() as User_Hobbies,
                        json_array() as User_Locations,
                        json_array() as User_Schools,
                        json_array() as User_Professions
                    
                    from 
                        User_Accounts as ua

                    left join 
                        Photo_Links as pl
                    on 
                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1

                    where 
                        ua.email = ? and ua.password = ?
        `;

        try { 
            let [result] = await this.sql.query(query, data);


            if(!result.length){
                return res.json({message: "No account matches with the email and password", acc_info: [], status: 0b10});
            }

            res.json({message: "Successfully retrieved account data!", acc_info: result[0], status: 0b11});

        } catch(err){

            console.log(err);

            res.json({message: "Error retreiving user account", acc_info: [], status: 0b01});
        }
    };
};

export default request;