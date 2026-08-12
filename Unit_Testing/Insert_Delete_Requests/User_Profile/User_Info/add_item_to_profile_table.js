let insert_options = {
    end_point: `/add_item_to_profile_table`,
    test_cases: [
        {
            description: "Add an item to User_Hobbies table",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Hobbies",
                    to_insert: {
                        hobby_name: "drinking",
                        start_date: "2026-08-08",
                        proficiency: "Expert",
                        privacy: "private",
                        story: "Drinking water is good for you!"
                    }
                }
            }
        },
        {
            description: "Add an item to User_Locations table",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Locations",
                    to_insert: {
                        city: "Knowhere",
                        start_date: "2026-08-08",
                        country: "Outer Space",
                        state: "Yomama",
                        end_date: "2200-12-31",
                        location_type: "Previous"
                    }
                }
            }
        },
        {
            description: "Add an item to User_Professions table",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Professions",
                    to_insert: {
                        profession_name: "Eating",
                        start_date: "2026-08-08",
                        proficiency: "Intermediate"
                    }
                }
            }
        },
        {
            description: "Add an item to User_Schools table",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Schools",
                    to_insert: {
                        school_name: "Dumb and Dumbererer of Science",
                        start_date: "2026-08-08",
                        city: "Askyourmom",
                        state: "Askurdaddy",
                        end_date: "2090-12-31"
                    }
                }
            }
        }
    ],
    req_type: "POST"
};

let delete_options = {
    end_point: `/remove_item_from_profile_table`,
    test_cases: [
        {
            description: "Delete the item that it just created",
            data: {
                url_params: ["User_Hobbies"],
                body: {
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "id",
                        name_for_delete: "params"
                    }
                ]
            }
        },
        {
            description: "Delete the item that it just created",
            data: {
                url_params: ["User_Locations"],
                body: {
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "id",
                        name_for_delete: "params"
                    }
                ]
            }
        },
        {
            description: "Delete the item that it just created",
            data: {
                url_params: ["User_Professions"],
                body: {
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "id",
                        name_for_delete: "params"
                    }
                ]
            }
        },
        {
            description: "Delete the item that it just created",
            data: {
                url_params: ["User_Schools"],
                body: {
                },
                //This is for when it required input after insert. i.e. "id" 
                //But sometimes when calling delete request, the body data isn't always named "id"
                //That's why each item in "required_from_insert" has "name_from_insert" and "name_for_delete"
                required_from_insert: [
                    {
                        name_from_insert: "id",
                        name_for_delete: "params"
                    }
                ]
            }
        }
    ],
    req_type: "DELETE"
};

export default [insert_options, delete_options];
