const options = {
    end_point: `/get_user_account_data`,
    test_cases: [
        {
            description: "Get user account data for user with id",
            data: {
                url_params: [1],
                body: {}
            }
        }
    ],
    req_type: "GET"
};

export default options;