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

let server = https.createServer({ key: privateKey, cert: certificate },app);
//let server = http.createServer(app);

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
app.post("/set_as_profile_picture", requests.user_accounts.profile.profile_data.set_as_profile_picture.req);


//Photos
app.post("/upload_pictures", uploads.array('files', 100), requests.user_accounts.profile.photos.upload_photos.req);
app.post("/get_photo_links", requests.user_accounts.profile.photos.get_photo_links.req);
app.post("/get_all_profile_pictures", requests.user_accounts.profile.profile_data.get_all_profile_pictures.req);
app.post("/insert_profile_photo_data", requests.user_accounts.profile.profile_data.insert_profile_photo_data.req);
app.post("/delete_data_base_profile_photo", requests.user_accounts.profile.profile_data.delete_database_profile_photos.req);
app.post("/delete_profile_photo_files", requests.user_accounts.profile.profile_data.delete_profile_photo_files.req);
app.post("/add_photo_album", requests.user_accounts.profile.photos.add_photo_album.req);
app.post("/get_photo_albums", requests.user_accounts.profile.photos.get_photo_albums.req);
app.post("/update_album", requests.user_accounts.profile.photos.update_album.req);
app.post("/add_photo_links", requests.user_accounts.profile.photos.add_photo_links.req);
app.post("/delete_photo_links", requests.user_accounts.profile.photos.delete_photo_links.req);
app.post("/delete_photo_files", requests.user_accounts.profile.photos.delete_photo_files.req);
app.post("/delete_album", requests.user_accounts.profile.photos.delete_album.req);

//Photo Comments
app.post("/submit_photo_comment", requests.user_accounts.profile.comments.photo_comments.submit_photo_comment.req);
app.post("/get_photo_comments", requests.user_accounts.profile.comments.photo_comments.get_photo_comments.req);
app.post("/update_photo_comment", requests.user_accounts.profile.comments.photo_comments.update_photo_comment.req);
app.post("/delete_photo_comment", requests.user_accounts.profile.comments.photo_comments.delete_photo_comment.req);

//Post Data
app.post("/create_post", requests.user_accounts.profile.post_data.create_post.req, requests.alerts.add_new_alert.req);
app.post("/update_post", requests.user_accounts.profile.post_data.update_post.req, requests.alerts.update_alert_data.req);
app.post("/get_posts", requests.user_accounts.profile.post_data.get_posts.req);
app.post("/delete_post", requests.user_accounts.profile.post_data.delete_post.req);
app.post("/delete_post_photo_links", requests.user_accounts.profile.post_data.delete_post_photo_links.req); 
app.post("/set_last_post", requests.user_accounts.profile.post_data.set_last_post.req);
app.post("/add_post_photo_links", requests.user_accounts.profile.post_data.add_post_photo_links.req);
app.post("/get_post_photo_links", requests.user_accounts.profile.post_data.get_post_photo_links.req);

//Video Streaming
app.post("/create_stream_room", requests.stream_rooms.create_stream_room.req);
app.post("/disband_stream_room", requests.stream_rooms.disband_stream_room.req);
app.post("/search_streams", requests.stream_rooms.search_streams.req);

//Connections
app.post("/get_connection_list", requests.connections.get_connection_requests.req, requests.connections.get_connection_list.req, (req, res)=>{ res.json({results: req.body.connection_list}); });
app.post("/find_connections", requests.connections.find_connections.req);
app.post("/send_connection_request", requests.connections.send_connection_request.req, requests.alerts.add_new_alert.req);
app.post("/get_connection_requests_from", requests.connections.get_connection_requests_from.req, (req, res)=>{ res.json({results: req.body.list_of_emails}); });
app.post("/get_connection_request_to", requests.connections.get_connection_requests_to.req, (req, res)=>{ res.json({results: req.body.list_of_emails}); });
app.post("/remove_connection_request", requests.connections.remove_connection_request.req);
app.post("/accept_connection_request", requests.connections.update_connection_request.req);

//Alerts
app.post("/update_alert_data", requests.alerts.update_alert_data.req);
app.post("/delete_alert", requests.alerts.delete_alert.req);
app.post("/get_connection_alerts", requests.connections.get_connection_requests.req, 
                                            requests.connections.get_connection_list.req,
                                            requests.alerts.get_alerts.req);

server.listen(8080, () => {
   
    console.log("Listening to port 8080");

});