let Stream_Room_Data_Template = function(initial){
  
    let template = {
        id: "",
        stream_id: "",
        email: "",
        first_name: "",
        last_name: "",
        gender: "",
        User_Locations: [],
        User_Schools: [],
        User_Hobbies: [],
        User_Professions: [],
        marital_status: "",
        profile_picture_link: "",
        time_created: null,
        stream_title: "",
        is_host: false
    };
    
    for(let i in initial){
        
        if(template[i] === undefined || template[i] === 'null'){
            continue;
        }
        
        template[i] = initial[i];
        
    }
    
    return template;
};

export default {
        Stream_Room_Data_Template: Stream_Room_Data_Template
};