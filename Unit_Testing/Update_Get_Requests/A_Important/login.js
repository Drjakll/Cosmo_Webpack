const options = {
    end_point: `/login`,
    test_cases: [
        {
            description: "Login user",
            data: {
                url_params: [],
                body: {
                    email: "dr_kimsora@yahoo.com",
                    password: "123"
                }
            }
        }
    ],
    req_type: "POST"
};

export default options;