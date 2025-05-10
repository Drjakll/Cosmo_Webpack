/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


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
        location_of_birth: "{}",
        schools: "[]",
        hobbies: "[]",
        professions: "[]",
        martial_status: "",
        current_location: "{}",
        relationships: "[]",
        last_posted: null,
        created_on: null
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
        Account_Data_Template: Account_Data_Template
};