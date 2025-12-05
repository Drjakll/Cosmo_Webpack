let Post_Data_Template = function (initial) {

    let template = {
        id: null,
        owner_email: "",
        date_created: Date.now(),
        title: "",
        last_edited: Date.now(),
        body: ""
    };

    for (let i in initial) {

        if (i === "id" || template[i] === undefined) {
            continue;
        }

        template[i] = initial[i];

    }

    return template;
};

let Post_Photo_Template = function(initial){
  
    let template = {
        id: null,
        owner_email: "",
        belongs_to_post: 0,
        added_on: Date.now(),
        link: "",
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
    Post_Data_Template,
    Post_Photo_Template
}