//Account
const login_account = `/login_account`;
const create_account = `/create_account`;

//Account photos
const add_photo_album = '/add_photo_album';
const add_photo_links = '/add_photo_links';
const get_photo_albums = '/get_photo_albums';
const get_photo_links = '/get_photo_links';
const delete_album = '/delete_album';
const get_all_profile_pictures = '/get_all_profile_pictures';
const set_as_profile_picture = '/set_as_profile_picture';
const insert_profile_photo_data = '/insert_profile_photo_data';
const delete_profile_photo_files = '/delete_profile_photo_files';
const delete_database_profile_photos = '/delete_data_base_profile_photo';
const delete_photo_links = '/delete_photo_links';
const delete_photo_files = '/delete_photo_files';
const update_album = '/update_album';

//Photo comments
const get_photo_comments = '/get_photo_comments';
const submit_photo_comment = '/submit_photo_comment';
const update_photo_comment = '/update_photo_comment';
const delete_photo_comment = '/delete_photo_comment';

//Posts
const get_posts = '/get_posts';
const create_post = '/create_post';
const update_post = '/update_post';
const delete_post = '/delete_post';
const delete_post_photo_links = '/delete_post_photo_links';
const set_last_post = '/set_last_post';
const add_post_photo_links = '/add_post_photo_links';
const get_post_photo_links = '/get_post_photo_links';

//Profile details
const update_profile = '/update_profile';

//Video streams
const create_stream_room = '/create_stream_room';
const disband_stream_room = '/disband_stream_room';
const search_streams = '/search_streams';

//Photo uploads
const upload_photos = '/upload_pictures';

//Connections
const get_connection_list = '/get_connection_list';
const find_connections = '/find_connections';
const send_connection_request = '/send_connection_request';
const accept_connection_request = '/accept_connection_request';
const remove_connection_request = '/remove_connection_request';
const get_connection_requests_from = '/get_connection_requests_from';
const get_connection_requests_to = '/get_connection_requests_to';

//Alerts
const update_alert_data = '/update_alert_data';
const get_connection_alerts = '/get_connection_alerts';
const delete_alert = '/delete_alert';

//Messaging
const create_conversation = "/create_conversation";
const update_conversation = "/update_conversation";
const get_conversations = "/get_conversations";
const delete_conversation = "/delete_conversation";

const aws_s3_url = 'https://cosmo-social-app.s3.us-west-1.amazonaws.com/';

export default {
    //Account
    login_account: login_account,
    create_account: create_account,
        
    //Account photos
    add_photo_album: add_photo_album,
    add_photo_links: add_photo_links,
    get_photo_albums: get_photo_albums,
    get_photo_links: get_photo_links,
    delete_album: delete_album,
    get_all_profile_pictures: get_all_profile_pictures,
    set_as_profile_picture: set_as_profile_picture,
    insert_profile_photo_data: insert_profile_photo_data,
    delete_profile_photo_files: delete_profile_photo_files,
    delete_database_profile_photos: delete_database_profile_photos,
    delete_photo_links: delete_photo_links,
    delete_photo_files: delete_photo_files,
    update_album: update_album,
        
    //Photo comments
    get_photo_comments: get_photo_comments,
    submit_photo_comment: submit_photo_comment,
    update_photo_comment: update_photo_comment,
    delete_photo_comment: delete_photo_comment,
        
    //Posts
    get_posts: get_posts,
    create_post: create_post,  
    update_post: update_post,
    delete_post: delete_post,
    delete_post_photo_links: delete_post_photo_links,
    set_last_post: set_last_post,
    add_post_photo_links: add_post_photo_links,
    get_post_photo_links: get_post_photo_links,

    //Profile details
    update_profile: update_profile,
        
    //Video streams
    create_stream_room: create_stream_room,
    disband_stream_room: disband_stream_room,
    search_streams: search_streams,

    //Photo uploads
    upload_photos: upload_photos,

    //Connections
    get_connection_list: get_connection_list,
    find_connections: find_connections,
    send_connection_request: send_connection_request,
    accept_connection_request: accept_connection_request,
    remove_connection_request: remove_connection_request,
    get_connection_requests_from: get_connection_requests_from,
    get_connection_requests_to: get_connection_requests_to,

    //Alerts
    update_alert_data: update_alert_data,
    get_connection_alerts: get_connection_alerts,
    delete_alert: delete_alert,

    //Messaging
    get_conversations: get_conversations,
    update_conversation: update_conversation,
    delete_conversation: delete_conversation,
    create_conversation: create_conversation,

    //Amazon Web Service Storage 3 URL
    aws_s3_url: aws_s3_url
};