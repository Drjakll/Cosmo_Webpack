let insert_options = {
    end_point: `/submit_comment`,
    test_cases: [
        {
            description:"Write a comment on the user's wall",
            data: {
                url_params: [],
                body: {
                    owner_user_id: 1,
                    commenter_user_id: 1,
                    target_id: 1,
                    target_id_type: "wall_id",
                    comment: "Hello World!",
                    replay_to_id: null
                }
            }
        },
        {
            description:"Write a comment on the user's photo",
            data: {
                url_params: [],
                body: {
                    owner_user_id: 1,
                    commenter_user_id: 1,
                    target_id: 241,
                    target_id_type: "photo_id",
                    comment: "Hello World!",
                    replay_to_id: null
                }
            }
        },
        {
            description:"Write a comment on the user's post",
            data: {
                url_params: [],
                body: {
                    owner_user_id: 1,
                    commenter_user_id: 1,
                    target_id: 39,
                    target_id_type: "post_id",
                    comment: "Hello World!",
                    replay_to_id: null
                }
            }
        }
    ],
    req_type: "POST"
};

let delete_options = {
    end_point: `/delete_comment`,
    test_cases: [
        {
            description: "Delete the comment it just wrote",
            data: {
                url_params: [],
                body: {
                    
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "insertId",
                        name_for_delete: "id"
                    }
                ]
            }
        },
        {
            description: "Delete the comment it just wrote",
            data: {
                url_params: [],
                body: {
                    
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "insertId",
                        name_for_delete: "id"
                    }
                ]
            }
        },
        {
            description: "Delete the comment it just wrote",
            data: {
                url_params: [],
                body: {
                    
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "insertId",
                        name_for_delete: "id"
                    }
                ]
            }
        }
    ],
    req_type: "POST"
};

export default [insert_options, delete_options];