import fs from 'fs';
import { query_wrapper } from './configurations/sql_connect.js';
import { S3ClientInstance, PutObjectCommand, DeleteObjectsCommand } from './configurations/aws_s3_config.js';
import { request } from 'http';

//Traverse through the "/requests/" directory to import all request functions

const GatherRequests = async (rootPath) => {

    let requests = {};

    const entries = fs.readdirSync(rootPath);

    for await (let file of entries) {

        let subPath = `${rootPath}${file}`;

        const isDir = fs.lstatSync(subPath).isDirectory();

        if (isDir) {

            requests[file] = await GatherRequests(subPath + "/");

        } else {
            
            let file_name_parts = file.split('.');
            
            let key = file_name_parts[0];
            
            if(file_name_parts[1] !== "js"){
                continue;
            }
            
            try {
                

                requests[key] = await import("./" + subPath.split("Requests/")[1]);

                requests[key] = requests[key].default;

                requests[key].prototype.sql = query_wrapper; //SQL_Middleware; //sql;

                requests[key].prototype.s3 = S3ClientInstance;

                requests[key].prototype.PutObjectCommand = PutObjectCommand;

                requests[key].prototype.DeleteObjectsCommand = DeleteObjectsCommand;

                requests[key] = new requests[key](query_wrapper, S3ClientInstance, PutObjectCommand, DeleteObjectsCommand);

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

