let request = function () {

    this.req = (req, res) => {

        let { requirements } = req.body;

        let query = this.generate_get_query("User_Accounts", 
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
            'current_location',
            'block_list'
        ]);

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


