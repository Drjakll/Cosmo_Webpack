const options = {
    end_point: `/get_one_set_reactions`,
    test_cases: [
        {
            description: "Get a set of reactions for example: 1 post or 1 photo",
            data: {
                url_params: [30, "post_id"],
                body: {}
            }
        }
    ],
    req_type: "GET"
};

export default options;