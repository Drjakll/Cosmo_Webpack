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

let Photo_Data = function (initial) {

    let template = {
        id: null,
        owner_email: "",
        link: "",
        image_descriptions: "",
        title: "",
        belongs_to_album: 0,
        meta_data: "{}",
        time_added: null
    };

    for (let i in initial) {

        if (i === "id" || template[i] === undefined) {
            continue;
        }

        template[i] = initial[i];

    }

    return template;
};

export default {
    Photo_Album_Data,
    Photo_Data
}