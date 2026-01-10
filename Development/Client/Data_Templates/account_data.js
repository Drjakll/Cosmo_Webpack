/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

import Choice_Type from './Info_Types/Choice_Type/choice_type.js';
import Date_Type from './Info_Types/Date_Type/date_type.js';
import Json_Type from './Info_Types/Json_Type/json_type.js';
import Text_Type from './Info_Types/Text_Type/text_type.js';

let Account_Data_Template = function(initial){
  
    let template = {
        id: -1,
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        created_on: Date.now(),
        is_online: false,
    };
    
    for(let i in initial){
        
        if(template[i] === undefined){
            continue;
        }
        
        template[i] = initial[i];
        
    }
    
    return template;
};

let Account_Info_Data_Template = function(){

    let template = {
        first_name: {
            component: Text_Type,
            label: "First Name",
            value: "",
            options: []
        },
        last_name: {
            component: Text_Type,
            label: "Last Name",
            value: "",
            options: []
        },
        date_of_birth: { 
            component: Date_Type,
            label: "Date of Birth", 
            value: "", 
            options: [] 
        },
        gender: {
            component: Choice_Type,
            label: "Gender",
            value: "",
            options: ["Male", "Female", "Unspecified"]
        },
        marital_status: {
            component: Choice_Type,
            label: "Marital Status",
            value: "",
            options: ["Single", "Dating", "Engaged", "Married", "Divorce", "Widow", "Unspecified"]
        },
        User_Locations: {
            component: Json_Type,
            label: "Locations",
            value: [],
            options: [
                { label: "Country", data_name: "country", data_type: "string" },
                { label: "State/Province", data_name: "state", data_type: "string" },
                { label: "City", data_name: "city", data_type: "string" },
                { label: "Start Date", data_name: "start_date", data_type: "date"},
                { label: "End Date", data_name: "end_date", data_type: "date"},
                { label: "Type of Location", data_name: "location_type", data_type: "enum", choices: ["birth","hometown","current","previous"]},
                { label: "Privacy", data_name: "privacy", data_type: "enum", choices: ["private", "public", "mutual"]  }
            ]
        },
        User_Hobbies: {
            component: Json_Type,
            label: "Hobbies",
            value: [],
            options: [
                { label: "Hobby Name", data_name: "hobby_name", data_type: "string" },
                { label: "Date Started", data_name: "start_date", data_type: "date" },
                { label: "Proficiency", data_name: "proficiency", data_type: "enum", choices: ["beginner", "intermediate", "advanced", "expert"]  },
                { label: "Story", data_name: "story", data_type: "string" },
                { label: "Privacy", data_name: "privacy", data_type: "enum", choices: ["private", "public", "mutual"]  }
            ]
        },
        User_Professions: {
            component: Json_Type,
            label: "Professions",
            value: [],
            options: [
                { label: "Profession Name", data_name: "profession_name", data_type: "string" },
                { label: "Date Started", data_name: "start_date", data_type: "date" },
                { label: "Proficiency", data_name: "proficiency", data_type: "enum", choices: ["beginner", "intermediate", "advanced", "expert"] },
                { label: "Privacy", data_name: "privacy", data_type: "enum", choices: ["private", "public", "mutual"]  }
            ]
        },
        User_Schools: {
            component: Json_Type,
            label: "Schools",
            value: [],
            options: [
                { label: "School Name", data_name: "school_name", data_type: "string"},
                { label: "Country", data_name: "country", data_type: "string" },
                { label: "State/Province", data_name: "state", data_type: "string" },
                { label: "City", data_name: "city", data_type: "string" },
                { label: "Start Date", data_name: "start_date", data_type: "date"},
                { label: "End Date", data_name: "end_date", data_type: "date"},
                { label: "Type of School", data_name: "school_type", data_type: "enum", choices: ["elementary", "middle", "high", "college"]},
                { label: "Privacy", data_name: "privacy", data_type: "enum", choices: ["private", "public", "mutual"]  }
            ]
        }
    };

    return template;
}

let Post_Data_Template = function(initial){
  
    let template = {
        id: null,
        title: "",
        body: "",
        owner_email: "",
        date_created: null,
        last_edited: null
    };
    
    for(let i in initial){
        
        if(i === "id" || template[i] === undefined){
            continue;
        }
        
        template[i] = initial[i];
        
    }
    
    return template;
};

export default {
        Account_Data_Template: Account_Data_Template,
        Post_Data_Template: Post_Data_Template,
        Account_Info_Data_Template: Account_Info_Data_Template
};