let Post_Data_Template = function (initial) {

    let template = {
        id: null,
        user_id: "",
        created_on: Date.now(),
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


export default {
    Post_Data_Template
}