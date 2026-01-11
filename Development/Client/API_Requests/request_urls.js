//Account
const login_account = `/login_account`;
const create_account = `/create_account`;

//Profile_Data
const update_profile = '/update_profile';
const add_item_to_profile_table = '/add_item_to_profile_table';
const remove_item_from_profile_table = '/remove_item_from_profile_table';
const update_profile_table_data = '/update_profile_table_data';
const get_user_account_data = '/get_user_account_data';

//Albums
const update_album = '/update_album';
const add_album = '/add_album';
const get_albums = '/get_albums';
const delete_album = '/delete_album';

//photos
const upload_photos = '/upload_photos';
const get_photo_links = '/get_photo_links';
const delete_photos = '/delete_photos';
const set_photo_as_cover = '/set_photo_as_cover';

//Comments
const submit_comment = "/submit_comment";
const get_comments = "/get_comments";
const update_comment = "/update_comment";
const delete_comment = "/delete_comment";
const delete_multiple_comments = "/delete_multiple_comments";
const update_reaction = "/update_reaction";
const submit_reaction = "/submit_reaction";

//Posts
const create_post = '/create_post';
const update_post = '/update_post';
const get_posts = '/get_posts';
const delete_post = '/delete_post'; 
const get_last_time_posted = "/get_last_time_posted";


//Connections
const get_connection_list = "/get_connection_list";
const find_connections = "/find_connections";
const send_connection_request = "/send_connection_request";
const get_connection_requests_from = "/get_connection_requests_from";
const get_connection_request_to = "/get_connection_request_to";
const remove_connection_request = "/remove_connection_request";
const update_connection_request = "/update_connection_request";
const send_follow_request = "/send_follow_request";
const unfollow_user_account = "/unfollow_user_account";
const get_all_followers = "/get_all_followers";
const get_all_followings = "/get_all_followings";
const get_follow_requests = "/get_follow_requests";
const remove_follow_request = "/remove_follow_request";
const update_follow_request = "/update_follow_request";
const find_public_user_info = "/find_public_user_info";
const search_within_followers = "/search_within_followers";
const search_within_followings = "/search_within_followings";

//Alerts
const get_alerts = "/get_alerts";

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
    login_account,
    create_account,

    //Profile data
    update_profile,
    add_item_to_profile_table,
    remove_item_from_profile_table,
    update_profile_table_data,
    get_user_account_data,
        
    //Photos
    upload_photos,
    get_photo_links,
    delete_photos,
    set_photo_as_cover,


    //Albums
    update_album,
    add_album,
    get_albums,
    delete_album,
        
    //Comments
    submit_comment,
    get_comments,
    update_comment,
    delete_comment,
    delete_multiple_comments,
    submit_reaction,
    update_reaction,
        
    //Posts
    get_posts,
    create_post,  
    update_post,
    delete_post,
    get_last_time_posted,


    //Connections
    get_connection_list,
    find_connections,
    send_connection_request,
    remove_connection_request,
    get_connection_requests_from,
    send_follow_request,
    unfollow_user_account,
    get_all_followers,
    get_all_followings,
    get_follow_requests,
    remove_follow_request,
    update_follow_request,
    find_public_user_info,
    search_within_followers,
    search_within_followings,
    get_connection_request_to,
    update_connection_request,

    //Alerts
    get_alerts,

    //User News Updates
    get_user_news_updates,

    //Messaging
    get_conversations,
    delete_conversation,
    create_conversation,
    insert_message,
    get_messages,
    user_seen_last_msg,
    clear_seen_by,
    leave_private_conversation,
    add_conversation_participants,
    join_public_channel,
    initialize_public_channel,
    get_favorite_public_channels,
    leave_public_channel,


    //Amazon Web Service Storage 3 URL
    aws_s3_url
};