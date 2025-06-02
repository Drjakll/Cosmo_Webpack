//Account
const login_account = `/login_account`;
const create_account = `/create_account`;

//Account photos
const get_photo_albums = '/get_photo_albums';
const get_photo_links = '/get_photo_links';
const get_all_profile_pictures = '/get_all_profile_pictures';

//Photo comments
const get_photo_comments = '/get_photo_comments';
const submit_photo_comment = '/submit_photo_comment';
const update_photo_comment = '/update_photo_comment';
const delete_photo_comment = '/delete_photo_comment';

//Posts
const get_posts = '/get_posts';

//Video streams
const create_stream_room = '/create_stream_room';
const disband_stream_room = '/disband_stream_room';
const search_streams = '/search_streams';

const aws_s3_url = 'https://cosmo-social-app.s3.us-west-1.amazonaws.com/';

export default {
        //Account
        login_account: login_account,
        create_account: create_account,
        
        //Account photos
        get_photo_albums: get_photo_albums,
        get_photo_links: get_photo_links,
        get_all_profile_pictures: get_all_profile_pictures,
        
        //Photo comments
        get_photo_comments: get_photo_comments,
        submit_photo_comment: submit_photo_comment,
        update_photo_comment: update_photo_comment,
        delete_photo_comment: delete_photo_comment,
        
        //Posts
        get_posts: get_posts,
        
        //Video streams
        create_stream_room: create_stream_room,
        disband_stream_room: disband_stream_room,
        search_streams: search_streams,
        
        //Amazon Web Service Storage 3 URL
        aws_s3_url: aws_s3_url
};