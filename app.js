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

let {user_accounts, messaging, get_web_pages, dummy_middleware, connections, alerts, user_news_updates} = requests;

let {profile, create_account, login, universal} = user_accounts;

//User_Accounts -> Profile
let { 
        albums,
        comments,
        photos,
        post_data,
        profile_data,
        get_user_account_data,
    } = profile;
 
let {
    get_general_reactions
} = universal

//User_Accounts -> Profile -> Albums
let {
        add_album,
        delete_album,
        get_albums,
        update_album

    } = albums;

//User_Accounts -> Profile -> Comments
let {
        delete_comment,
        get_comment_reactions,
        get_comments,
        submit_comment,
        update_comment,
        delete_comments_from_targets,
        delete_multiple_comments,
        delete_general_reactions,
        update_reaction,
        submit_reaction
    } = comments;

//User_Accounts -> Profile -> Photos
let {
        add_photo_links,
        delete_photo_files,
        delete_photo_links,
        get_photo_links,
        set_photo_as_cover,
        upload_photos

    } = photos;

//User_Accounts -> Profile -> Post_Data
let {
        create_post,
        delete_post,
        get_last_time_posted,
        get_posts,
        update_post

    } = post_data

//User_Accounts -> Profile -> Profile_Data
let {
    update_profile, 
    add_item_to_profile_table,
    remove_item_from_profile_table,
    update_profile_table_data,
    get_user_table_data

} = profile_data;

//Messaging
let {
        add_conversation_participants, 
        clear_seen_by, 
        create_conversation,
        delete_conversation,
        get_conversations,
        get_favorite_public_channels,
        get_messages,
        initialize_public_channel,
        create_public_channel,
        insert_message,
        join_public_channel,
        leave_private_conversation,
        leave_public_channel,
        user_seen_last_msg

    } = messaging;

//Get_Web_Pages
let {entry_page} = get_web_pages;

//Get_Web_Pages -> Entry_Page
let {entry} = entry_page;

//Dummy_Middle_Ware
let {dummy_middleware: result_sender} = dummy_middleware;

//Connections
let {
        find_connections,
        get_all_followers,
        get_all_followings,
        get_follow_requests,
        remove_follow_request,
        search_within_followers,
        search_within_followings,
        send_follow_request,
        unfollow_user_account,
        update_follow_request,
        remove_follower

    } = connections;

//Alerts
let {
    get_alerts,
    get_follow_request_alert

} = alerts;

//User_News_Updates
let {
        get_user_news_updates

    } = user_news_updates;



//Below are the API routes


//Entry page
app.get("/", entry.req);

//User account APIs
app.post("/create_account", create_account.req);
app.post("/login", login.req, 
                    get_user_table_data.req, 
                    get_user_table_data.req, 
                    get_user_table_data.req, 
                    get_user_table_data.req);


//Profile Data
app.patch("/update_profile", update_profile.req);
app.patch("/update_profile_table_data", update_profile_table_data.req);
app.post("/add_item_to_profile_table", add_item_to_profile_table.req);
app.delete("/remove_item_from_profile_table", remove_item_from_profile_table.req);
app.get("/get_user_account_data/:id", get_user_account_data.req);
app.post("/get_user_table_data", get_user_table_data.req);


//Albums
app.patch("/update_album", update_album.req);
app.post("/add_album", add_album.req);
app.get("/get_albums/:id", get_albums.req);
app.post("/delete_album", delete_album.req, 
                            get_photo_links.req, 
                            delete_photo_links.req, 
                            delete_general_reactions.req, 
                            delete_comments_from_targets.req,
                            delete_photo_files.req);

//Photos
app.post("/upload_photos", uploads.array('files', 100), upload_photos.req, add_photo_links.req);
app.post("/get_photo_links", get_photo_links.req, get_general_reactions.req);
app.post("/delete_photos", delete_photo_links.req, 
                            delete_general_reactions.req, 
                            delete_comments_from_targets.req, 
                            delete_photo_files.req);
app.post("/set_photo_as_cover", set_photo_as_cover.req);

//Comments
app.post("/submit_comment", submit_comment.req);
app.post("/get_comments", get_comments.req, get_comment_reactions.req, get_comments.req);
app.post("/update_comment", update_comment.req);
app.post("/delete_comment", delete_comment.req);
app.post("/delete_multiple_comments", delete_multiple_comments.req);
app.post("/update_reaction", update_reaction.req);
app.post("/submit_reaction", submit_reaction.req);

//Post Data                         
app.post("/create_post", create_post.req);
app.post("/update_post", update_post.req);
app.post("/get_posts", get_posts.req, get_general_reactions.req);
app.post("/delete_post", delete_post.req, 
                            delete_general_reactions.req,
                            delete_comments_from_targets.req, //delete_comments_from_targets must go before delete_photo_links
                            delete_photo_links.req, 
                            delete_photo_files.req); 
app.post("/get_last_time_posted", get_last_time_posted.req);

//Connections
app.post("/find_connections", find_connections.req);
app.post("/send_follow_request", send_follow_request.req);
app.post("/unfollow_user_account", unfollow_user_account.req);
app.post("/get_all_followers", get_all_followers.req);
app.post("/get_all_followings", get_all_followings.req);
app.get("/get_follow_requests/:id", get_follow_requests.req);
app.post("/remove_follow_request", remove_follow_request.req);
app.patch("/update_follow_request", update_follow_request.req);
app.post("/search_within_followers", search_within_followers.req);
app.post("/search_within_followings", search_within_followings.req);
app.post("/remove_follower", remove_follower.req);

//Alerts
app.post("/get_alerts", get_alerts.req);
app.get("/get_follow_request_alert/:user_id", get_follow_request_alert.req);

//User News Updates
app.post("/get_user_news_updates", get_user_news_updates.req);


//Messaging
app.post("/create_conversation", create_conversation.req);
app.post("/delete_conversation", delete_conversation.req);
app.post("/get_conversations", get_conversations.req);
app.post("/get_messages", get_messages.req);
app.post("/insert_message", insert_message.req);
app.post("/clear_seen_by", clear_seen_by.req);
app.post("/user_seen_last_msg", user_seen_last_msg.req);
app.post("/leave_private_conversation", leave_private_conversation.req);
app.post("/add_conversation_participants", add_conversation_participants.req);
app.post("/create_public_channel", create_public_channel.req, join_public_channel.req);
app.post("/join_public_channel", join_public_channel.req);
app.post("/get_favorite_public_channels", get_favorite_public_channels.req);
app.post("/leave_public_channel", leave_public_channel.req);

server.listen(8080, () => {
   
    console.log("Listening to port 8080");

});