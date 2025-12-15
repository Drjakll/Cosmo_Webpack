let request = function () {

    this.req = (req, res) => {

        let { requirements, id } = req.body;

        let query = `
            select 
                ua.* 
            from
                (${this.generate_get_query("User_Accounts", 
                    requirements, 
                    ['id', 
                    'email',
                    'first_name', 
                    'last_name', 
                    'profile_picture_link', 
                    'date_of_birth',
                    'gender',
                    'professions', 
                    'schools',
                    'marital_status',
                    'hobbies',
                    'current_location'
                ])}) as ua
            join
                Connections as c
            on
                c.follower_id = ua.id and c.followed_id = ${id}
            where
                c.status = 'accepted';
        `;

        this.sql.query(query, (err, results) => {

            if (err) {

                console.log(query, err.sqlMessage);
                res.json({ "message": "Error retreiving followers list", results: [] });

            } else {

                res.json({ "message": `Retreived ${results.length} results`, results });

            }

            res.end();

        });
    };

};

export default request;


