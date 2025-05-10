/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let Photo_Comment_Data_Template = function(initial){
  
    let template = {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
        profile_picture_link: "",
        comment: "",
        time_stamp: null,
        belongs_to_photo_id: null,
        reply_to_comment: null
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
        Photo_Comment_Data_Template: Photo_Comment_Data_Template
};


