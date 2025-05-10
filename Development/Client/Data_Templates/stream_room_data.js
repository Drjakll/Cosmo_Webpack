let Stream_Room_Data_Template = function(initial){
  
    let template = {
        id: "",
        host_email: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        location_of_birth: "{}",
        schools: "[]",
        hobbies: "[]",
        professions: "[]",
        martial_status: "",
        current_location: "{}",
        relationships: "[]",
        thumbnail_link: null,
        time_created: null,
        room_title: "",
        is_host: false
    };
    
    for(let i in initial){
        
        if(template[i] === undefined){
            continue;
        }
        
        template[i] = initial[i];
        
    }
    
    return template;
};

export default {
        Stream_Room_Data_Template: Stream_Room_Data_Template
};