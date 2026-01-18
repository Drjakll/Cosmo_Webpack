function request() {
    
    this.req = async (req, res) => {
        
        let {email, password}= req.body;

        let data = [email, password];

        let query = `select 
                        id,
                        first_name,
                        last_name,
                        marital_status,
                        gender,
                        date_of_birth,
                        email,
                        created_on,
                        pl.link as profile_picture_link
                    
                    from User_Accounts as ua

                    left join Photo_Links as pl
                    on 
                        pl.target_id = ua.id and pl.target_type = 'profile' and pl.is_a_cover = 1
                    where 
                        ua.email = ? and password = ?
        `;
        
        try { 
            let [result] = await this.sql.query(query, data);

            if(!result.length){
                return res.json({message: "No account matches with the email and password", result: []});
            }

            res.json({message: "Successfully retrieved account data!", result: result[0]});

        } catch(err){

            console.log(err);

            res.json({message: "Error retreiving user account", result: []});
        }
    };
};

export default request;