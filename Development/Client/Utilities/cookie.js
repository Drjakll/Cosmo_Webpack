let cookie_parser = (cookie) => {

    let entries = cookie.split(";");

    let jsonObj = {};

    for (let i in entries) {

        let splits = entries[i].split("=");

        jsonObj[splits[0].replace(' ', '')] = splits[1];

    }

    return jsonObj;

};

let cookie_converter = function*(json, options) {

    for (let i in json) {

        let cookieStr = "";

        cookieStr += `${i} = ${json[i]}; `;

        for (let j in options) {

            cookieStr += `${j} = ${options[j]}; `;
        }
        
       yield cookieStr;

    }
};

export default {cookie_parser: cookie_parser, cookie_converter: cookie_converter };