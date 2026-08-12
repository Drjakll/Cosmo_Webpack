const options = {
    end_point: `/get_photo_links`,
    test_cases: [
        {
            description: "Get a single photo link",
            data: {
                url_params: [],
                body: {
                    id: 217
                }
            },
            show_result: false
        },
        {
            description: "Get user's list of photo links",
            data: {
                url_params: [],
                body: {
                    target_id: 15,
                    target_id_type: "album_id"
                }
            },
            show_result: false
        },
        {
            description: "Get user's list of recently uploaded photo links",
            data: {
                url_params: [],
                body: {
                    target_id: 15,
                    target_id_type: "album_id",
                    time_uploaded: 1782874547691
                }
            },
            show_result: false
        }
    ],
    req_type: "POST"
};

export default options;