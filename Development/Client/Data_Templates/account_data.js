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
        id: null,
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        profile_picture_link: "",
        date_of_birth: "",
        gender: "",
        location_of_birth: "[]",
        schools: "[]",
        hobbies: "[]",
        professions: "[]",
        marital_status: "",
        current_location: "[]",
        relationships: "[]",
        block_list: "{}",
        last_posted: null,
        created_on: null,
        is_online: false
    };
    
    for(let i in initial){
        
        if(i === "id" || template[i] === undefined){
            continue;
        }
        
        template[i] = initial[i];
        
    }
    
    return template;
};

let Account_Info_Data_Template = function(editor = null){

    let template = {
                first_name: {
                    component: Text_Type,
                    label: "First Name",
                    value: "",
                    editor: null,
                    options: []
                },
                last_name: {
                    component: Text_Type,
                    label: "Last Name",
                    value: "",
                    editor: null,
                    options: []
                },
                date_of_birth: { 
                    component: Date_Type,
                    label: "Birth Date", 
                    value: "", 
                    editor: null, 
                    options: [] 
                },
                gender: {
                    component: Choice_Type,
                    label: "Gender",
                    value: "",
                    editor: null,
                    options: ["Male", "Female"]
                },
                marital_status: {
                    component: Choice_Type,
                    label: "Marital Status",
                    value: "",
                    editor: null,
                    options: ["Single", "Dating", "Engaged", "Married", "Divorce", "Widow", "Unspecified"]
                },
                location_of_birth: {
                    component: Json_Type,
                    label: "Birthplace",
                    value: "",
                    editor: null,
                    options: [
                        { label: "Country", data_type: "string" },
                        { label: "State/Province", data_type: "string" },
                        { label: "City", data_type: "string" }
                    ]
                },
                current_location: {
                    component: Json_Type,
                    label: "Current Location",
                    value: "",
                    editor: null,
                    options: [
                        { label: "Country", data_type: "string" },
                        { label: "State/Province", data_type: "string" },
                        { label: "City", data_type: "string" }
                    ]
                },
                hobbies: {
                    component: Json_Type,
                    label: "Hobbies",
                    value: "",
                    editor: null,
                    options: [
                        { label: "Hobby", data_type: "string" },
                        { label: "Date Started", data_type: "date" },
                        { label: "Profeciency", data_type: "string" }
                    ]
                },
                professions: {
                    component: Json_Type,
                    label: "Talent",
                    value: "",
                    editor: null,
                    options: [
                        { label: "Talent", data_type: "string" },
                        { label: "Date Started", data_type: "date" },
                        { label: "Profeciency", data_type: "string" }
                    ]
                },
                schools: {
                    component: Json_Type,
                    label: "School",
                    value: "",
                    editor: null,
                    options: [
                        { label: "School", data_type: "string" },
                        { label: "Type", data_type: "string" },
                        { label: "Year Graduate", data_type: "date" }
                    ]
                }
            };

    if(editor){

        for(let i in editor){
            template[i].editor = editor[i];
        }
    }

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