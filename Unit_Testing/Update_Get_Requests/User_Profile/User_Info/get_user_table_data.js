const options = {
    end_point: `/get_user_table_data`,
    test_cases: [
        {
            description: "Get user's hobby list",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Hobbies",
                    user_id: 1,
                }
            }
        },
        {
            description: "Get user's school list",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Schools",
                    user_id: 1,
                }
            }
        },
        {
            description: "Get user's profession list",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Professions",
                    user_id: 1,
                }
            }
        },
        {
            description: "Get user's location list",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Locations",
                    user_id: 1,
                }
            }
        }
    ],
    req_type: "POST"
};

export default options;
