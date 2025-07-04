let Photo_Album_Data = function(initial){
  
    let template = {
        id: null,
        owner_email: "",
        created_on: null,
        title: "",
        cover_image_link: "",
        brief_description: ""
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
    Photo_Album_Data
}