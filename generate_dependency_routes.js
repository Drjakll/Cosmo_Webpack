import fs from "fs/promises";

const root = './Development/Client';
const output_file = './webpack.config.js'; 
const webpack_config_text_data = './webpack_config.txt';

let route_objs = {};

let insert_into_route_objs = (key, value)=>{

    route_objs[key] = value;
};

let traversal = async (r)=>{

    let entries = await fs.readdir(r,{withFileTypes: true});

    for(let entry of entries){

        if(entry.isDirectory()){

            let route = `${r}/${entry.name}`;

            await traversal(route);

        } else {

            let {name} = entry;

            let file_type = name.split('.')[1];

            if(file_type !== 'js' || name === 'react_entry.js'){
                continue;
            }

            let file_name = name.split('.')[0];

            let file_path = `${r}/${name}`;

            insert_into_route_objs(file_name, file_path);

        }

    }

};

let write_file = async ()=>{

    await traversal(root);

    let to_write = ``;

    let write_export = ``

    for(let key in route_objs){

        to_write += `import ${key} from '${route_objs[key]}';\n`;

        write_export += `${key},\n`
    }

    const text =  `${to_write}\n\n export{${write_export}} \n\n export default{${write_export}}`;

    return text;
}

let write_to_file2 = async ()=>{

    await traversal(root);

    let to_write = await fs.readFile(webpack_config_text_data, "utf8");

    for(let key in route_objs){

        to_write += `\t\t\t\t'@${key}': path.resolve(__dirname, '${route_objs[key]}'),\n`
    }

    to_write += `
            }
        }
    };


    module.exports = [serverConfig, clientConfig];`

    return to_write;
}

let text = await write_to_file2();

await fs.writeFile(output_file, text, "utf8");


