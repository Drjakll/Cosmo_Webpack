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

//Photo comments
const get_post_comments = '/get_post_comments';
const submit_post_comment = '/submit_post_comment';
const update_post_comment = '/update_post_comment';
const delete_post_comment = '/delete_post_comment';

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
const send_follow_request = '/send_follow_request';
const unfollow_user_account = '/unfollow_user_account';
const get_all_followers = '/get_all_followers';
const get_all_followings = '/get_all_followings';
const get_follow_requests = '/get_follow_requests';
const remove_follow_request = '/remove_follow_request';
const update_follow_request = '/update_follow_request';
const find_public_user_info = '/find_public_user_info';
const search_within_followers = '/search_within_followers';
const search_within_followings = '/search_within_followings';

//Alerts
const update_alert_data = '/update_alert_data';
const get_connection_alerts = '/get_connection_alerts';
const delete_alert = '/delete_alert';

//User News Updates
const get_user_news_updates = '/get_user_news_updates';

//Messaging
const create_conversation = "/create_conversation";
const get_conversations = "/get_conversations";
const delete_conversation = "/delete_conversation";
const insert_message = "/insert_message";
const get_messages = "/get_messages";
const clear_seen_by = "/clear_seen_by";
const user_seen_last_msg = "/user_seen_last_msg";
const leave_private_conversation = "/leave_private_conversation";
const add_conversation_participants = "/add_conversation_participants";
const initialize_public_channel = "/initialize_public_channel";
const join_public_channel = "/join_public_channel";
const get_favorite_public_channels = "/get_favorite_public_channels";
const leave_public_channel = "/leave_public_channel";

//Amazon Web Service Storage 3 URL
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

    //Post comments
    get_post_comments: get_post_comments,
    submit_post_comment: submit_post_comment,
    update_post_comment: update_post_comment,
    delete_post_comment: delete_post_comment,

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
    send_follow_request: send_follow_request,
    unfollow_user_account: unfollow_user_account,
    get_all_followers: get_all_followers,
    get_all_followings: get_all_followings,
    get_follow_requests: get_follow_requests,
    remove_follow_request: remove_follow_request,
    update_follow_request: update_follow_request,
    find_public_user_info: find_public_user_info,
    search_within_followers: search_within_followers,
    search_within_followings: search_within_followings,

    //Alerts
    update_alert_data: update_alert_data,
    get_connection_alerts: get_connection_alerts,
    delete_alert: delete_alert,

    //User News Updates
    get_user_news_updates: get_user_news_updates,

    //Messaging
    get_conversations: get_conversations,
    delete_conversation: delete_conversation,
    create_conversation: create_conversation,
    insert_message: insert_message,
    get_messages: get_messages,
    user_seen_last_msg: user_seen_last_msg,
    clear_seen_by: clear_seen_by,
    leave_private_conversation: leave_private_conversation,
    add_conversation_participants: add_conversation_participants,
    join_public_channel: join_public_channel,
    initialize_public_channel: initialize_public_channel,
    get_favorite_public_channels: get_favorite_public_channels,
    leave_public_channel: leave_public_channel,


    //Amazon Web Service Storage 3 URL
    aws_s3_url: aws_s3_url
};