const options = {
    end_point: `/get_user_wall`,
    test_cases: [
        {
            description: "Get a user's wall comments",
            data: {
                url_params: [1],
                body: {}
            }
        }
    ],
    req_type: "GET"
};

export default options;