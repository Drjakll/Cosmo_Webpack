let insert_options = {
    end_point: `/create_account`,
    test_cases: [
        {
            description: "Create an account with given information",
            data: {
                url_params: [],
                body: {
                    email: "someemail@email.com",
                    password: "abc123",
                    first_name: "somefirstname",
                    last_name: "somelastname",
                    date_of_birth: "1999-04-15",
                    gender: "male",
                    marital_status: "single"
                }
            }
        }
    ],
    req_type: "POST"
};

let delete_options = {
    end_point: `/test_erase_unverify_account`,
    test_cases: [
        {
            description: "Erase the account it just created",
            data: {
                url_params: [],
                body: {
                    passcode: process?.env?.DAILY_CHECK_UP_PASSCODE,
                    x_days: -1
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                ]
            }
        }
    ],
    req_type: "POST"
};

export default [insert_options, delete_options];
