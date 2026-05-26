/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

import Choice_Type from './Info_Types/Choice_Type/choice_type.js';
import Date_Type from './Info_Types/Date_Type/date_type.js';
import Json_Type from './Info_Types/Json_Type/json_type.js';
import Text_Type from './Info_Types/Text_Type/text_type.js';
import Json_Text_Type from './Info_Types/Json_Text_Type/json_text_type.js';

let Generate_Temp_ID = function(){

    return "temp_" + `${(Math.random() * 100).toFixed(0)}${Date.now()}`;

};

let Account_Data_Template = function(initial){
  
    let template = {
        id: null,
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        created_on: Date.now(),
        mood_today: "",
        personal_traits: {},
        last_mood_updated: null,
        is_online: false,
    };
    
    for(let i in initial){
        
        if(template[i] === undefined){
            continue;
        }
        
        template[i] = initial[i];
        
    }

    if(isNaN(parseInt(template.id))) {
        template.id = Generate_Temp_ID();
    }
    
    return template;
};

let Account_Info_Data_Template = function(initial = {}){

    let template = {
        email: {
            component: Text_Type,
            label: "E-mail",
            value: "",
            options: [],
            label_icon: "name_tag_icon.png"
        },
        password: {
            component: Text_Type,
            label: "Password",
            value: "",
            options: [],
            label_icon: "name_tag_icon.png"
        },
        first_name: {
            component: Text_Type,
            label: "First Name",
            value: "",
            options: [],
            label_icon: "name_tag_icon.png"
        },
        last_name: {
            component: Text_Type,
            label: "Last Name",
            value: "",
            options: [],
            label_icon: "name_tag_icon.png"
        },
        date_of_birth: { 
            component: Date_Type,
            label: "Date of Birth", 
            value: "", 
            options: [],
            label_icon: "birthdate_icon.png"
        },
        gender: {
            component: Choice_Type,
            label: "Gender",
            value: "",
            options: ["Male", "Female", "Unspecified"],
            label_icon: "gender_icon.png"
        },
        marital_status: {
            component: Choice_Type,
            label: "Marital Status",
            value: "",
            options: ["Single", "Dating", "Engaged", "Married", "Divorce", "Widow", "Unspecified"],
            label_icon: "marital_status_icon.png"
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
            ],
            background: "location_background.png",
            label_icon: "location_icon.png"
        },
        User_Hobbies: {
            component: Json_Type,
            label: "Hobbies",
            value: [],
            options: [
                { label: "Hobby Name", data_name: "hobby_name", data_type: "string" },
                { label: "Date Started", data_name: "start_date", data_type: "date" },
                { label: "Proficiency", data_name: "proficiency", data_type: "enum", choices: ["beginner", "intermediate", "advanced", "expert"] },
                { label: "Story", data_name: "story", data_type: "string" },
                { label: "Privacy", data_name: "privacy", data_type: "enum", choices: ["private", "public", "mutual"]  }
            ],
            background: "hobby_background.png",
            label_icon: "hobby_icon.png"
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
            ],
            background: "profession_background.png",
            label_icon: "profession_icon.png"
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
            ],
            background: "school_background.png",
            label_icon: "school_icon.png"
        },
        personal_traits: {
            component: Json_Text_Type,
            label: "Personal Traits",
            value: "",
            options: [],
            background: "personal_trait_background.png",
            label_icon: "trait_icon.png"
        }
    };

    for(let i in initial){
        template[i].component = initial[i].component || template[i].component;
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

let Mood_Options = {
    "Angry": "angry_2.png",
    "Sad": "sad_2.png",
    "Happy": "happy.png",
    "Excited": "excited.png",
    "Depressed": "depressed.png",
    "Confused": "confused.png",
    "Heartbroken": "heartbroken.png",
    "Shocked": "shocked.png",
    "Anxious": "anxious.png",
    "Worry": "worry.png",
    "Overwhelmed": "overwhelmed.png",
    "Annoyed": "annoyed.png",
    "Surprised": "surprised_2.png",
    "Sympathetic": "sympathetic_2.png",
    "Silly": "silly.png",
    "Loved": "loved.png",
    "Tired": "tired.png",
    "Confident": "confident.png",
    "Lonely": "lonely.png",
    "Emotionless": "emotionless.png",
    "Scared": "scared.png",
    "Disgusted": "digusted.png",
    "Homesick": "homesick.png",
    "Energetic": "energetic.png",
    "Important": "important.png",
    "Bored": "bored.png",
    "Flattered": "flattered.png",
    "Humble": "humble.png",
    "Impatient": "impatient.png",
    "Calm": "calm.png"
};

export default {
        Account_Data_Template,
        Post_Data_Template,
        Account_Info_Data_Template,
        Mood_Options
};