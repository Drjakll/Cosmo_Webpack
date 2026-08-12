const options = {
    end_point: `/update_profile`,
    test_cases: [
        {
            description: "Update a user's profile information",
            data: {
                url_params: [],
                body: {
                    credentials: {
                        id: 1
                    },
                    to_update: {
                        first_name: "Justin",
                        last_name: "Zhu",
                        date_of_birth: "1987-04-15",
                        gender: "male",
                        marital_status: "single"
                    }
                }
            }
        }
    ],
    req_type: "PATCH"
};

export default options;