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

const uploads = multer({
    dest: './uploads'
});

//let domain = '10.0.0.70';
//let domain = '192.168.7.108';

const keyPath = './my-key.pem'; // Replace with your actual key file
const certPath = './my-cert.pem';    // Replace with your actual cert file

const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');

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

//Entry page
app.get("/", requests.get_web_pages.entry_page.entry.req);

//User account APIs
app.post("/create_account", requests.user_accounts.create_account.req);
app.post("/login_account", requests.user_accounts.login_account.req);


//Profile Data
app.post("/update_profile", requests.user_accounts.profile.profile_data.update_profile.req);
app.post("/upload_pictures", uploads.array('files', 100), requests.user_accounts.profile.photos.upload_photos.req);
app.post("/get_photo_links", requests.user_accounts.profile.photos.get_photo_links.req);
app.post("/get_all_profile_pictures", requests.user_accounts.profile.profile_data.get_all_profile_pictures.req);
app.post("/insert_profile_photo_data", requests.user_accounts.profile.profile_data.insert_profile_photo_data.req);
app.post("/delete_data_base_profile_photo", requests.user_accounts.profile.profile_data.delete_database_profile_photos.req);
app.post("/delete_profile_photo_files", requests.user_accounts.profile.profile_data.delete_profile_photo_files.req);


//Photos
app.post("/add_photo_album", requests.user_accounts.profile.photos.add_photo_album.req);
app.post("/get_photo_albums", requests.user_accounts.profile.photos.get_photo_albums.req);
app.post("/update_album", requests.user_accounts.profile.photos.update_album.req);
app.post("/add_photo_links", requests.user_accounts.profile.photos.add_photo_links.req);
app.post("/delete_photo_links", requests.user_accounts.profile.photos.delete_photo_links.req);
app.post("/delete_photo_files", requests.user_accounts.profile.photos.delete_photo_files.req);
app.post("/delete_album", requests.user_accounts.profile.photos.delete_album.req);


//Post Data
app.post("/create_post", requests.user_accounts.profile.post_data.create_post.req);
app.post("/update_post", requests.user_accounts.profile.post_data.update_post.req);
app.post("/get_posts", requests.user_accounts.profile.post_data.get_posts.req);
app.post("/delete_post", requests.user_accounts.profile.post_data.delete_post.req);
app.post("/set_last_post", requests.user_accounts.profile.post_data.set_last_post.req);

server.listen(4000, () => {
    
    console.log("Listening to port 4000");

});