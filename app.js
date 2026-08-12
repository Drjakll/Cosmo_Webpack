import express from 'express';
import body from 'body-parser';
import cookieparser from 'cookie-parser';
import http from 'http';
import websocket from './Development/Server/Websockets/websocket.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import 'dotenv/config';

const uploads = multer({
    storage: multer.memoryStorage()
});
   

let app = express();

const keyPath = './localhost+2-key.pem';
const certPath = './localhost+2.pem';

const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');

//let server = https.createServer({ key: privateKey, cert: certificate },app);
let server = http.createServer(app);

app.use('/static', 
    express.static(path.join(__dirname, '..', 'Built_Client')));
app.use(cookieparser());
app.use(body.json({ limit: "10mb" }));
app.use(body.urlencoded({ extended: true }));
app.set('trust proxy', true);

/*
app.use((req, res, next) => {

    let start = Date.now();
    
    res.on('finish', ()=>{

        console.log(`${req.method}, \nRoute: ${req.originalUrl} \nStatusCode: ${res.statusCode} \nTime: ${Date.now() - start}ms \n\n`);

    });

    next();
});*/

let progress_io = await websocket(server);

let capture_io = (req, res, next) => {

    let {socket_id} = JSON.parse(req.body.metadata);

    let socket = progress_io.sockets.sockets.get(socket_id);

    if(!socket){
        console.log("Socket not found, unable to track progress");
    }

    req.body.socket = socket;

    next();
};

import requests from './Development/Server/Requests/requests.js';

let route_obj = {uploads: {
                    req: uploads.array('files', 50)
                },
                capture_io: {
                    req: capture_io
                }
};


let route_urls = {}; //This is a list of request url strings for frontend

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

        //If no req_type, that means it's just use for middleware
        if(!req_type){
            continue;
        }

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

        //If no req_path, that means the function is just used as a middleware only.
        if(!req_path){

            continue;
        }


        let route_key = req_path.split("/")[1];

        //This is a list of request url strings for front end
        route_urls[route_key] = "/" + route_key ;

        //Call the express app with the request path, type, and callbacks
        app[req_type](req_path, callbacks);
    }

    //It needs this for accessing aws s3 photos
    route_urls['aws_s3_url'] = 'https://cosmo-social-app.s3.us-west-1.amazonaws.com/';
    
};

app.get('/request_routes', (req, res)=>{

    res.json({route_urls});
});

let starter = async () => {

    recursion(requests);
    apply_paths();

    let x_days = 3; //Number of days to check for unverified accounts before it gets deleted

    setInterval(async ()=>{
        
        let results = await route_obj.daily_account_check.erase_unverified_accounts(x_days);

        for(let r of results){

            console.log(new Date(parseInt(r.created_on)));

        }

    }, 24 * 60 * 60000); //Scan for unverified accounts every 24 hours

};

starter();

server.listen(8080, "0.0.0.0", () => {
   
    console.log("Listening to localhost port 8080");

});