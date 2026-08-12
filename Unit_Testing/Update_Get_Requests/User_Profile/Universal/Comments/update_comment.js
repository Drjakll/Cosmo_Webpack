const options = {
    end_point: `/update_comment`,
    test_cases: [
        {
            description: "Update existing wall comment",
            data: {
                url_params: [],
                body: {
                    id: 217,
                    comment: "Yo, wazzzzzap!",
                    target_id: 1,
                    target_id_type: "wall_id"
                }
            }
        },
        {
            description: "Update existing photo comment",
            data: {
                url_params: [],
                body: {
                    id: 202,
                    comment: "Yep, this definitely look like me and I love it!",
                    target_id: 241,
                    target_id_type: "photo_id"
                }
            }
        }
    ],
    req_type: "PATCH"
};

export default options;