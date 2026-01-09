/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let Comment_Template = function(initial){
  
    let template = {
        id: null,
        user_id: null,
        comment: "",
        time_stamp: Date.now(),
        reply_to_id: null,
        target_type: null,
        target_id: null,
        last_updated: Date.now()
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
        Comment_Template
};


