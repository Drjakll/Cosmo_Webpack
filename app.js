import express from 'express';
import body from 'body-parser';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import https from 'https';
import http from 'http';
import websocket from './Development/Server/Websockets/websocket.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import 'dotenv/config';

const uploads = multer({
    dest: './uploads'
});

//let domain = '10.0.0.70';
//let domain = '192.168.7.108';

const keyPath = './my-key.pem'; // Replace with your actual key file
const certPath = './my-cert.pem';    // Replace with your actual cert file

const keyPath2 = './localhost+2-key.pem';
const certPath2 = './localhost+2.pem';

//const privateKey = fs.readFileSync(keyPath2, 'utf8');
//const certificate = fs.readFileSync(certPath2, 'utf8');

let app = express();

//let server = https.createServer({ key: privateKey, cert: certificate },app);
let server = http.createServer(app);

websocket(server);

app.use('/static', express.static(path.join(__dirname, '..', 'Built_Client')));
app.use(cookieparser());
app.use(body.json({ limit: "1000mb" }));
app.use(body.urlencoded({ extended: true }));

app.set('trust proxy', true);

import requests from './Development/Server/Requests/requests.js';

let route_obj = {uploads: {req: uploads.array('files', 100)}};

//Round up all the requests
let recursion = (obj) => {

    for(let key in obj){

        if(obj[key].req !== undefined){

            route_obj[key] = obj[key];

        } else {

            recursion(obj[key]);

        }

    }

};

const valid_req_types = ["get", "post", "put", "delete", "patch"];

//Apply the requests to the express app
let apply_paths = () => {

    for(let key in route_obj){

        if(key === "uploads"){
            continue;
        }

        let {req_path, req_type, callbacks: callback_labels} = route_obj[key];

        if(!valid_req_types.includes(req_type)){

            throw new Error(`Invalid request type '${req_type}' for route '${req_path}'`);
        }

        let callbacks = [];

        for(let label of callback_labels){

            if(!route_obj[label]){

                throw new Error(`Invalid callback label '${label}' for route '${req_path}'`);
            }

            callbacks.push(route_obj[label].req);
        }

        //Call the express app with the request path, type, and callbacks
        app[req_type](req_path, callbacks);
    }
    
};

let starter = async () => {

    recursion(requests);
    apply_paths();

};

starter();

server.listen(8080, "127.0.0.1", () => {
   
    console.log("Listening to localhost port 8080");

});