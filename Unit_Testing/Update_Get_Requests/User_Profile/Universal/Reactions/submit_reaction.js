const options = {
    end_point: `/submit_reaction`,
    test_cases: [
        {
            description: "Submit or update reaction and with passionate emoji",
            data: {
                url_params: [],
                body: {
                    emoji: "passionate",
                    target_id_type: "post_id",
                    target_id: 30,
                    reaction: "dislike"
                }
            }
        },
        {
            description: "Submit or update reaction and with laugh emoji",
            data: {
                url_params: [],
                body: {
                    emoji: "laugh",
                    target_id_type: "post_id",
                    target_id: 30,
                    reaction: "like"
                }
            }
        },
        {
            description: "Submit or update reaction and with sad emoji",
            data: {
                url_params: [],
                body: {
                    emoji: "sad",
                    target_id_type: "post_id",
                    target_id: 30,
                    reaction: "dislike"
                }
            }
        },
        {
            description: "Submit or update reaction without emoji",
            data: {
                url_params: [],
                body: {
                    emoji: '',
                    target_id_type: "post_id",
                    target_id: 30,
                    reaction: "like"
                }
            }
        }
    ],
    req_type: "POST"
};

export default options;