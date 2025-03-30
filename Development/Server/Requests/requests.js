import fs from 'fs';
import { sql } from './configurations/sql_connect.js';
import { s3, PutObjectCommand } from './configurations/aws_s3_config.js';
import global_data from './configurations/global_data.js';
import generate_update_query from './tools/generate_update_query.js';
import generate_insert_query from './tools/generate_insert_query.js';
import generate_time_string from './tools/generate_time_string.js';

//Traverse through the "/requests/" directory to import all request functions

const GatherRequests = async (rootPath) => {

    let requests = {};

    const entries = await fs.readdirSync(rootPath);

    for await (let file of entries) {

        let subPath = `${rootPath}${file}`;

        const isDir = fs.lstatSync(subPath).isDirectory();

        if (isDir) {

            requests[file] = await GatherRequests(subPath + "/");

        } else {
            
            let file_name_parts = file.split('.');
            
            let key = file_name_parts[0];
            
            if(file_name_parts[1] != "js"){
                continue;
            }
            
            try {
                

                requests[key] = await import("./" + subPath.split("Requests/")[1]);

                requests[key] = requests[key].default;

                requests[key].prototype.sql = sql;

                requests[key].prototype.s3 = s3;

                requests[key].prototype.PutObjectCommand = PutObjectCommand;

                requests[key].prototype.global_data = global_data;
                
                requests[key].prototype.generate_update_query = generate_update_query;
                
                requests[key].prototype.generate_insert_query = generate_insert_query;
                
                requests[key].prototype.generate_time_string = generate_time_string;

                requests[key] = new requests[key]();

            } catch(e) {
                
                console.log(e);
                continue;
            }
            
        }
    }

    return requests;

};

let requests = await GatherRequests(`${__dirname}/../Development/Server/Requests/requests/`);

export default requests;

