const options = {
    end_point: `/view_user_account_data`,
    test_cases: [
        {
            description: "View another user's account data",
            data: {
                url_params: [],
                body: {
                    viewer_id: 2,
                    target_id: 1
                }
            }
        }
    ],
    req_type: "POST"
};

export default options;