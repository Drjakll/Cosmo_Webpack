import fs from 'fs';
import { query_wrapper } from './configurations/sql_connect.js';
import {verify_encrypted_password, generate_encrypted_password} from './utilities/password_maintenance.js';
import { S3ClientInstance, PutObjectCommand, DeleteObjectsCommand } from './configurations/aws_s3_config.js';
import { request } from 'http';

const GenerateEncryptedPasswords = async () => {

    let sql = query_wrapper;

    let query = `select * from User_Accounts`;

    let [results] = await sql.query(query);

    for(let result of results){

        let encrypted_password = await generate_encrypted_password(result.password);

        let re_query = `update User_Accounts set password = ? where id = ?`;

        await sql.query(re_query, [encrypted_password, result.id]);

    }

};

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

                requests[key] = new requests[key]({
                    sql: query_wrapper, 
                    s3: S3ClientInstance, 
                    PutObjectCommand, 
                    DeleteObjectsCommand, 
                    verify_encrypted_password,
                    generate_encrypted_password
                });

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

