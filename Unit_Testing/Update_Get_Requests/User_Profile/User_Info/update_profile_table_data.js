const options = {
    end_point: `/update_profile_table_data`,
    test_cases: [
        {
            description: "Update a user's profile hobbies table data",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Hobbies",
                    id: 1,
                    to_update: {
                        hobby_name: "Gunplas",
                        proficiency: "Beginner",
                        story: "I love gundams"
                    }
                }
            }
        },
        {
            description: "Update a user's profile locations table data",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Locations",
                    id: 1,
                    to_update: {
                        city: "S.F.",
                        country: "Murica",
                        location_type: "Current",
                        end_date: "2050-12-31"
                    }
                }
            }
        },
        {
            description: "Update a user's profile professions table data",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Professions",
                    id: 1,
                    to_update: {
                        profession_name: "SWE",
                        proficiency: "Advanced",
                        start_date: "2005-09-01"
                    }
                }
            }
        },
        {
            description: "Update a user's profile schools table data",
            data: {
                url_params: [],
                body: {
                    table_name: "User_Schools",
                    id: 19,
                    to_update: {
                        school_name: "Galileo of No Technology",
                        city: "San Fran",
                        country: "Murica",
                        end_date: "2005-06-01",
                        school_type: "High"
                    }
                }
            }
        }
    ],
    req_type: "PATCH"
};

export default options;