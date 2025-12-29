let Photo_Album_Data = function(initial){
  
    let template = {
        user_id: -1,
        created_on: null,
        title: "",
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
        user_id: "",
        link: "",
        image_descriptions: "",
        title: "",
        target_id: -1,
        target_type: "",
        meta_data: "{}",
        time_uploaded: null
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