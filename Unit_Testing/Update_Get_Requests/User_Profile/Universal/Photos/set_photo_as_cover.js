const options = {
    end_point: `/set_photo_as_cover`,
    test_cases: [
        {
            description: "Change the user's profile picture",
            data: {
                url_params: [],
                body: {
                    photo_cover_id: 285,
                    target_id_type: 'profile_id',
                    target_id: 1,
                    user_id: 1
                }
            }
        },
        {
            description: "Change the user's profile picture by using the last profile picture's id",
            data: {
                url_params: [],
                body: {
                    last_cover_id: 285,
                    photo_cover_id: 291
                }
            }
        }
    ],
    req_type: "POST"
};

export default options;