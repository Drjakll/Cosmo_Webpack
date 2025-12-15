let request = function () {

    this.req = (req, res, next)=>{

        let {id} = req.body;

        let query = `
            select 
                id,
                first_name,
                last_name,
                profile_picture_link,
                gender,
                date_of_birth,
                location_of_birth,
                schools,
                professions,
                marital_status,
                current_location,
                relationships,
                hobbies,
                privacy
            from 
                User_Accounts
            where 
                id = ${id};
        `;

        this.sql.query(query, (err, result) => {

            if(err || result.length === 0){

                console.log(query, err?.sqlMessage);
                res.json({message: "Error getting user public information"});
                
            } else {

                req.body.user_account_info = result[0];

                next();
            }

            res.end();

        }); 
    };
};

export default request;