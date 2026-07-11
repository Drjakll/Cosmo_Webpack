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
        verification_code: null,
        email_verified: false,
        session_id: null,
        privacy: null,
        profile_picture_link: null,
        profile_picture_id: null,
        User_Schools: null,
        User_Locations: null,
        User_Hobbies: null,
        User_Professions: null
    };
    
    for(let i in initial){
        
        if(template[i] === undefined){
            continue;
        }
        
        template[i] = initial[i];
        
    }

    if(isNaN(parseInt(template.id))) {
        //template.id = Generate_Temp_ID();
    }
    
    return template;
};

let Account_Info_Data_Template = function(initial = {}){

    let template = {
        /*email: {
            component: Text_Type,
            label: "E-mail",
            value: "",
            options: [],
            label_icon: "name_tag_icon.webp"
        },
        password: {
            component: Text_Type,
            label: "Password",
            value: "",
            options: [],
            label_icon: "name_tag_icon.webp"
        },*/
        first_name: {
            component: Text_Type,
            label: "First Name",
            value: "",
            options: [],
            label_icon: "name_tag_icon.webp"
        },
        last_name: {
            component: Text_Type,
            label: "Last Name",
            value: "",
            options: [],
            label_icon: "name_tag_icon.webp"
        },
        date_of_birth: { 
            component: Date_Type,
            label: "Date of Birth", 
            value: "", 
            options: [],
            label_icon: "birthdate_icon.webp"
        },
        gender: {
            component: Choice_Type,
            label: "Gender",
            value: "",
            options: ["Male", "Female", "Unspecified"],
            label_icon: "gender_icon.webp"
        },
        marital_status: {
            component: Choice_Type,
            label: "Marital Status",
            value: "",
            options: ["Single", "Dating", "Engaged", "Married", "Divorce", "Widow", "Unspecified"],
            label_icon: "marital_status_icon.webp"
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
            background: "location_background.webp",
            label_icon: "location_icon.webp"
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
            background: "hobby_background.webp",
            label_icon: "hobby_icon.webp"
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
            background: "profession_background.webp",
            label_icon: "profession_icon.webp"
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
            background: "school_background.webp",
            label_icon: "school_icon.webp"
        },
        personal_traits: {
            component: Json_Text_Type,
            label: "Personal Traits",
            value: "",
            options: [],
            background: "personal_trait_background.webp",
            label_icon: "trait_icon.webp"
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
    "Angry": "angry_2.webp",
    "Sad": "sad_2.webp",
    "Happy": "happy.webp",
    "Excited": "excited.webp",
    "Depressed": "depressed.webp",
    "Confused": "confused.webp",
    "Heartbroken": "heartbroken.webp",
    "Shocked": "shocked.webp",
    "Anxious": "anxious.webp",
    "Worry": "worry.webp",
    "Overwhelmed": "overwhelmed.webp",
    "Annoyed": "annoyed.webp",
    "Surprised": "surprised_2.webp",
    "Sympathetic": "sympathetic_2.webp",
    "Silly": "silly.webp",
    "Loved": "loved.webp",
    "Tired": "tired.webp",
    "Confident": "confident.webp",
    "Lonely": "lonely.webp",
    "Emotionless": "emotionless.webp",
    "Scared": "scared.webp",
    "Disgusted": "digusted.webp",
    "Homesick": "homesick.webp",
    "Energetic": "energetic.webp",
    "Important": "important.webp",
    "Bored": "bored.webp",
    "Flattered": "flattered.webp",
    "Humble": "humble.webp",
    "Impatient": "impatient.webp",
    "Calm": "calm.webp"
};

export default {
        Account_Data_Template,
        Post_Data_Template,
        Account_Info_Data_Template,
        Mood_Options
};