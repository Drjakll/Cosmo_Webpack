let request = function () {

    this.req = (req, res) => {

        let { email } = req.body;

        let query = `
            select
                id,
                first_name,
                last_name,
                email,
                profile_picture_link,
                date_of_birth,
                gender,
                professions,
                schools,
                marital_status,
                hobbies,
                current_location,
                connection_list,
                block_list
            from
                User_Accounts
            where
                json_contains_path(connection_list, 'one', '$."${email}"') 
        `;
        
        this.sql.query(query, (err, result) => {

            if (err) {
                console.log(err.sqlMessage);
                res.json({ "message": "Error retreiving connection list", result: [] });

            } else {

                res.json({ "message": `Retreived ${result.length} results`, result: result });

            }

            res.end();

        });
    };

};

export default request;


