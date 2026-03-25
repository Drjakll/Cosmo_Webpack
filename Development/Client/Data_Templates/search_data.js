import Search_Parameters from '@data_templates/Search_Parameters/search_parameters.js';

let Search_Data_Template = function(initial = Search_Parameters){

    let template = {
        first_name: {
            component: null,
            label: "First Name",
            value: "",
            options: []
        },
        last_name: {
            component: null,
            label: "Last Name",
            value: "",
            options: []
        },
        date_of_birth: { 
            component: null,
            label: "Date of Birth", 
            value: "", 
            options: [] 
        },
        gender: {
            component: null,
            label: "Gender",
            value: "",
            options: ["Male", "Female", "Unspecified"]
        },
        marital_status: {
            component: null,
            label: "Marital Status",
            value: "",
            options: ["Single", "Dating", "Engaged", "Married", "Divorce", "Widow", "Unspecified"]
        },
        User_Locations: {
            component: null,
            label: "Locations",
            value: [],
            options: [
                { label: "Country", data_name: "country", data_type: "string" },
                { label: "State/Province", data_name: "state", data_type: "string" },
                { label: "City", data_name: "city", data_type: "string" },
                { label: "Type of Location", data_name: "location_type", data_type: "enum", choices: ["birth","hometown","current","previous"]}
            ]
        },
        User_Hobbies: {
            component: null,
            label: "Hobbies",
            value: [],
            options: [
                { label: "Hobby Name", data_name: "hobby_name", data_type: "string" },
                { label: "Proficiency", data_name: "proficiency", data_type: "enum", choices: ["beginner", "intermediate", "advanced", "expert"] }
            ]
        },
        User_Professions: {
            component: null,
            label: "Professions",
            value: [],
            options: [
                { label: "Profession Name", data_name: "profession_name", data_type: "string" },
                { label: "Proficiency", data_name: "proficiency", data_type: "enum", choices: ["beginner", "intermediate", "advanced", "expert"] }
            ]
        },
        User_Schools: {
            component: null,
            label: "Schools",
            value: [],
            options: [
                { label: "School Name", data_name: "school_name", data_type: "string"},
                { label: "Country", data_name: "country", data_type: "string" },
                { label: "State/Province", data_name: "state", data_type: "string" },
                { label: "City", data_name: "city", data_type: "string" },
                { label: "Type of School", data_name: "school_type", data_type: "enum", choices: ["elementary", "middle", "high", "college"]}
            ]
        }
    };

    for(let i in initial){
        template[i].component = initial[i].component;
    }

    return template;
}

export default {
    Search_Data_Template
}