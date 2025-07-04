//Account
const login_account = `/login_account`;
const create_account = `/create_account`;

//Account photos
const add_photo_album = '/add_photo_album';
const get_photo_albums = '/get_photo_albums';
const get_photo_links = '/get_photo_links';
const get_all_profile_pictures = '/get_all_profile_pictures';
const set_as_profile_picture = '/set_as_profile_picture';
const insert_profile_photo_data = '/insert_profile_photo_data';
const delete_profile_photo_files = '/delete_profile_photo_files';
const delete_database_profile_photos = '/delete_data_base_profile_photo';

//Photo comments
const get_photo_comments = '/get_photo_comments';
const submit_photo_comment = '/submit_photo_comment';
const update_photo_comment = '/update_photo_comment';
const delete_photo_comment = '/delete_photo_comment';

//Posts
const get_posts = '/get_posts';

//Profile details
const update_profile = '/update_profile';

//Video streams
const create_stream_room = '/create_stream_room';
const disband_stream_room = '/disband_stream_room';
const search_streams = '/search_streams';

//Photo uploads
const upload_photos = '/upload_pictures';

const aws_s3_url = 'https://cosmo-social-app.s3.us-west-1.amazonaws.com/';

export default {
    //Account
    login_account: login_account,
    create_account: create_account,
        
    //Account photos
    add_photo_album: add_photo_album,
    get_photo_albums: get_photo_albums,
    get_photo_links: get_photo_links,
    get_all_profile_pictures: get_all_profile_pictures,
    set_as_profile_picture: set_as_profile_picture,
    insert_profile_photo_data: insert_profile_photo_data,
    delete_profile_photo_files: delete_profile_photo_files,
    delete_database_profile_photos: delete_database_profile_photos,
        
    //Photo comments
    get_photo_comments: get_photo_comments,
    submit_photo_comment: submit_photo_comment,
    update_photo_comment: update_photo_comment,
    delete_photo_comment: delete_photo_comment,
        
    //Posts
    get_posts: get_posts,

    //Profile details
    update_profile: update_profile,
        
    //Video streams
    create_stream_room: create_stream_room,
    disband_stream_room: disband_stream_room,
    search_streams: search_streams,

    //Photo uploads
    upload_photos: upload_photos,

    //Amazon Web Service Storage 3 URL
    aws_s3_url: aws_s3_url
};