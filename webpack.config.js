var path = require('path');
var externals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';


var serverConfig = {
    entry: ['babel-polyfill','./app.js'],
    mode: isProduction ? "production" : "development",
    plugins: [

    ],
    output: {
        path: path.resolve(__dirname, 'Built_Server'),
        filename: 'built_server.js'
    },
    module: {
        rules: [{
                test: /\.js$|jsx/,
                use: [
                    { loader: 'babel-loader' },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.worker\.js$/,
                use: [{ loader: 'worker-loader' }],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        fallback: {
            "crypto": false,
            "http": require.resolve("stream-http"),
            "fs": false,
            "zlib": false,
            net: false,
            tls: false,
            https: require.resolve("https-browserify"),            
        },
        alias: {
            'worker_threads': false // Prevent errors related to worker_threads
        }
    },
    target: 'node',
    externals: [externals()],
    /*
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },*/
    node: {
        __dirname: false,
    }
};

var clientConfig = {
    entry: './Development/Client/react_entry.js',
    mode: isProduction ? "production" : "development",
    plugins: [
        
    ],
    output: {
        filename: 'built_client.js',
        path: path.join(__dirname, 'Built_Client')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: 'styleTag',
                        esModule: false,
                        insert: 'body'
                    }},
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "less-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    }
                }
            ]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'Built_Client')
    },
    target: 'web',
    resolve: {
        fallback: {
            crypto: false,
            http: require.resolve("stream-http"),
            fs: false,
            zlib: false,
            net: false,
            tls: false,
            https: require.resolve("https-browserify"),            
        },
        alias: {
				'@request_urls': path.resolve(__dirname, './Development/Client/API_Requests/request_urls.js'),
				'@request_urls_old': path.resolve(__dirname, './Development/Client/API_Requests/request_urls_old.js'),
				'@empty': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Empty/empty.js'),
				'@album_feed': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Feeds/Feed_Types/Album_Feed/album_feed.js'),
				'@post_feed': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Feeds/Feed_Types/Post_Feed/post_feed.js'),
				'@suggestions': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Feeds/Feed_Types/Suggestions/suggestions.js'),
				'@feeds': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Feeds/feeds.js'),
				'@search_streams': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Stream_List_Components/Search_Streams/search_streams.js'),
				'@individual_stream_thumbnail': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Stream_List_Components/Stream_Displays/Individual_Stream_Thumbnail/individual_stream_thumbnail.js'),
				'@init_stream': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Stream_List_Components/Stream_Displays/Init_Stream/init_stream.js'),
				'@stream_displays': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Stream_List_Components/Stream_Displays/stream_displays.js'),
				'@stream_list_components': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Stream_List_Components/stream_list_components.js'),
				'@init_streaming_buttons': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Prepare_To_Stream/Init_Streaming_Buttons/init_streaming_buttons.js'),
				'@video_playback': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Prepare_To_Stream/Video_Playback/video_playback.js'),
				'@prepare_to_stream': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Prepare_To_Stream/prepare_to_stream.js'),
				'@message': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/Chat_Box/Message/message.js'),
				'@text_input': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/Chat_Box/Text_Input/text_input.js'),
				'@viewer_entry': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/Chat_Box/Viewer_Display/Viewer_Entry/viewer_entry.js'),
				'@viewer_display': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/Chat_Box/Viewer_Display/viewer_display.js'),
				'@chat_box': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/Chat_Box/chat_box.js'),
				'@main_video': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/Main_Video/main_video.js'),
				'@sub_video': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/Sub_Video/sub_video.js'),
				'@streaming': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/Streaming/streaming.js'),
				'@video_stream_screen': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/Video_Stream_Screen/video_stream_screen.js'),
				'@live_stream': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Live_Stream/live_stream.js'),
				'@connection_channel': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Channel_Selections/Connection_Channel/connection_channel.js'),
				'@join_channel_options': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Channel_Selections/Join_Channel_Options/join_channel_options.js'),
				'@other_channel': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Channel_Selections/Other_Channel/other_channel.js'),
				'@channel_selections': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Channel_Selections/channel_selections.js'),
				'@conversation_input': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Message_Area/Conversation_Input/conversation_input.js'),
				'@msg_entry': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Message_Area/Conversation_Texts/Msg_Entry/msg_entry.js'),
				'@conversation_texts': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Message_Area/Conversation_Texts/conversation_texts.js'),
				'@conversation_thumbnail': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Message_Area/Conversation_Thumbnail/conversation_thumbnail.js'),
				'@message_area': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Message_Area/message_area.js'),
				'@user_thumbnail': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Users/User_Thumbnail/user_thumbnail.js'),
				'@users': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/Users/users.js'),
				'@messaging': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Messaging/messaging.js'),
				'@follow_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Connections_Editor/Follow_Editor/follow_editor.js'),
				'@connections_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Connections_Editor/connections_editor.js'),
				'@choice_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/Choice_Editor/choice_editor.js'),
				'@date_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/Date_Editor/date_editor.js'),
				'@new_item': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/Json_Editor/Json_Popup_Editor/New_Item/new_item.js'),
				'@json_popup_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/Json_Editor/Json_Popup_Editor/json_popup_editor.js'),
				'@json_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/Json_Editor/json_editor.js'),
				'@json_text_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/Json_Text_Editor/json_text_editor.js'),
				'@text_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/Text_Editor/text_editor.js'),
				'@data_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Data_Editor/data_editor.js'),
				'@container_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Photo_Editor/Container_Editor/container_editor.js'),
				'@photo_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/Photo_Editor/photo_editor.js'),
				'@info_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/Info_Editor/info_editor.js'),
				'@layer_1_private': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_1_Private/layer_1_private.js'),
				'@the_photos': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_2_Private/Post_Editor/The_Editor/The_Photos/the_photos.js'),
				'@text_node': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_2_Private/Post_Editor/The_Editor/The_Texts/Text_Node/text_node.js'),
				'@the_texts': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_2_Private/Post_Editor/The_Editor/The_Texts/the_texts.js'),
				'@the_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_2_Private/Post_Editor/The_Editor/the_editor.js'),
				'@post_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_2_Private/Post_Editor/post_editor.js'),
				'@wall_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_2_Private/Wall_Editor/wall_editor.js'),
				'@layer_2_private': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_2_Private/layer_2_private.js'),
				'@enlarged_photo_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_3_Private/Album_Editor/Photos_Container_Editor/Photo_Thumbnail_Editor/Enlarged_Photo_Editor/enlarged_photo_editor.js'),
				'@photo_thumbnail_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_3_Private/Album_Editor/Photos_Container_Editor/Photo_Thumbnail_Editor/photo_thumbnail_editor.js'),
				'@photos_container_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_3_Private/Album_Editor/Photos_Container_Editor/photos_container_editor.js'),
				'@album_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_3_Private/Album_Editor/album_editor.js'),
				'@layer_3_private': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/Layer_3_Private/layer_3_private.js'),
				'@profile_private': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Profile/profile_private.js'),
				'@search': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/Search/search.js'),
				'@screen': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Screen/screen.js'),
				'@comment_container_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Universal_Components/Comments_Container_Editor/Comment_Container_Editor/comment_container_editor.js'),
				'@comments_container_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Universal_Components/Comments_Container_Editor/comments_container_editor.js'),
				'@single_post_editor': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Universal_Components/Single_Post_Editor/single_post_editor.js'),
				'@account_buttons': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Upper_Bar/Account_Buttons/account_buttons.js'),
				'@connection_request': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Upper_Bar/Alert_Buttons/Connection_Request/connection_request.js'),
				'@follow_request': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Upper_Bar/Alert_Buttons/Follow_Request/follow_request.js'),
				'@post_alert': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Upper_Bar/Alert_Buttons/Post_Alert/post_alert.js'),
				'@alert_buttons': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Upper_Bar/Alert_Buttons/alert_buttons.js'),
				'@online_users': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Upper_Bar/Online_Users/online_users.js'),
				'@upper_bar': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/Upper_Bar/upper_bar.js'),
				'@logged_in': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Logged_In/logged_in.js'),
				'@buttons': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Login_Account/Buttons/buttons.js'),
				'@create': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Login_Account/Create/create.js'),
				'@login': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Login_Account/Login/login.js'),
				'@restore': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Login_Account/Restore/restore.js'),
				'@login_account': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/Login_Account/login_account.js'),
				'@entrance_options': path.resolve(__dirname, './Development/Client/App_Entrance/Entrance_Options/entrance_options.js'),
				'@app_entrance': path.resolve(__dirname, './Development/Client/App_Entrance/app_entrance.js'),
				'@context': path.resolve(__dirname, './Development/Client/Context/context.js'),
				'@choice_type': path.resolve(__dirname, './Development/Client/Data_Templates/Info_Types/Choice_Type/choice_type.js'),
				'@date_type': path.resolve(__dirname, './Development/Client/Data_Templates/Info_Types/Date_Type/date_type.js'),
				'@json_text': path.resolve(__dirname, './Development/Client/Data_Templates/Info_Types/Json_Text_Type/Json_Text/json_text.js'),
				'@json_text_type': path.resolve(__dirname, './Development/Client/Data_Templates/Info_Types/Json_Text_Type/json_text_type.js'),
				'@json_screen': path.resolve(__dirname, './Development/Client/Data_Templates/Info_Types/Json_Type/Json_Screen/json_screen.js'),
				'@json_type': path.resolve(__dirname, './Development/Client/Data_Templates/Info_Types/Json_Type/json_type.js'),
				'@text_type': path.resolve(__dirname, './Development/Client/Data_Templates/Info_Types/Text_Type/text_type.js'),
				'@choice': path.resolve(__dirname, './Development/Client/Data_Templates/Search_Parameters/Choice/choice.js'),
				'@date': path.resolve(__dirname, './Development/Client/Misc_Components/Calendar/Dates_Display/Date/date.js'),
				'@json': path.resolve(__dirname, './Development/Client/Data_Templates/Search_Parameters/Json/json.js'),
				'@text': path.resolve(__dirname, './Development/Client/Data_Templates/Search_Parameters/Text/text.js'),
				'@search_parameters': path.resolve(__dirname, './Development/Client/Data_Templates/Search_Parameters/search_parameters.js'),
				'@account_data': path.resolve(__dirname, './Development/Client/Data_Templates/account_data.js'),
				'@comment_data': path.resolve(__dirname, './Development/Client/Data_Templates/comment_data.js'),
				'@photo_album_data': path.resolve(__dirname, './Development/Client/Data_Templates/photo_album_data.js'),
				'@post_data': path.resolve(__dirname, './Development/Client/Data_Templates/post_data.js'),
				'@search_data': path.resolve(__dirname, './Development/Client/Data_Templates/search_data.js'),
				'@stream_room_data': path.resolve(__dirname, './Development/Client/Data_Templates/stream_room_data.js'),
				'@logo': path.resolve(__dirname, './Development/Client/Logo/logo.js'),
				'@dates_display': path.resolve(__dirname, './Development/Client/Misc_Components/Calendar/Dates_Display/dates_display.js'),
				'@day_display': path.resolve(__dirname, './Development/Client/Misc_Components/Calendar/Day_Display/day_display.js'),
				'@month_year_display': path.resolve(__dirname, './Development/Client/Misc_Components/Calendar/Month_Year_Display/month_year_display.js'),
				'@calendar': path.resolve(__dirname, './Development/Client/Misc_Components/Calendar/calendar.js'),
				'@popup_message': path.resolve(__dirname, './Development/Client/Popup_Templates/Popup_Message/popup_message.js'),
				'@profile_popup': path.resolve(__dirname, './Development/Client/Popup_Templates/Profile_Popup/profile_popup.js'),
				'@portal': path.resolve(__dirname, './Development/Client/Popup_Templates/portal.js'),
				'@account_access': path.resolve(__dirname, './Development/Client/Universal_Components/Account_Functions/account_access.js'),
				'@get_follows': path.resolve(__dirname, './Development/Client/Universal_Components/Account_Functions/get_follows.js'),
				'@comment_container': path.resolve(__dirname, './Development/Client/Universal_Components/Comments_Container/Comment_Container/comment_container.js'),
				'@comment_input': path.resolve(__dirname, './Development/Client/Universal_Components/Comments_Container/Comment_Input/comment_input.js'),
				'@comments_container': path.resolve(__dirname, './Development/Client/Universal_Components/Comments_Container/comments_container.js'),
				'@individual_photo': path.resolve(__dirname, './Development/Client/Universal_Components/Enlarged_Photo_Viewer/Individual_Photo/individual_photo.js'),
				'@enlarged_photo_viewer': path.resolve(__dirname, './Development/Client/Universal_Components/Enlarged_Photo_Viewer/enlarged_photo_viewer.js'),
				'@general_reactions_container': path.resolve(__dirname, './Development/Client/Universal_Components/General_Reactions_Container/general_reactions_container.js'),
				'@post_photo_viewer': path.resolve(__dirname, './Development/Client/Universal_Components/Posts/Single_Post/Post_Photo_Viewer/post_photo_viewer.js'),
				'@single_post': path.resolve(__dirname, './Development/Client/Universal_Components/Posts/Single_Post/single_post.js'),
				'@profile_thumbnail': path.resolve(__dirname, './Development/Client/Universal_Components/Profile_Thumbnail/profile_thumbnail.js'),
				'@connections_public': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/Layer_1_Public/Connections_Public/connections_public.js'),
				'@profile_info_public': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/Layer_1_Public/Profile_Info_Public/profile_info_public.js'),
				'@layer_1_public': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/Layer_1_Public/layer_1_public.js'),
				'@posts_public': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/Layer_2_Public/Posts_Public/posts_public.js'),
				'@layer_2_public': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/Layer_2_Public/layer_2_public.js'),
				'@albums_public': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/Layer_3_Public/Albums_Public/albums_public.js'),
				'@layer_3_public': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/Layer_3_Public/layer_3_public.js'),
				'@public_profile_view': path.resolve(__dirname, './Development/Client/Universal_Components/Public_Profile_View/public_profile_view.js'),
				'@search_criteria_box': path.resolve(__dirname, './Development/Client/Universal_Components/Search_Criteria_Box/search_criteria_box.js'),
				'@configurations': path.resolve(__dirname, './Development/Client/Utilities/configurations.js'),
				'@cookie': path.resolve(__dirname, './Development/Client/Utilities/cookie.js'),
				'@drag': path.resolve(__dirname, './Development/Client/Utilities/drag.js'),
				'@drag_scroll': path.resolve(__dirname, './Development/Client/Utilities/drag_scroll.js'),
				'@init_websocket': path.resolve(__dirname, './Development/Client/Utilities/init_websocket.js'),
				'@upload_files_to_s3': path.resolve(__dirname, './Development/Client/Utilities/upload_files_to_s3.js'),
				'@connection_list_entry': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Connections/Connection_List_Template/Connection_List_Entry/connection_list_entry.js'),
				'@connection_list_template': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Connections/Connection_List_Template/connection_list_template.js'),
				'@follow_list': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Connections/Follow_List/follow_list.js'),
				'@connections': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Connections/connections.js'),
				'@profile_info_data': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Profile_Info/Profile_Info_Data/profile_info_data.js'),
				'@enlarged_profile_photo': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Profile_Info/Profile_Picture/Enlarged_Profile_Photo/enlarged_profile_photo.js'),
				'@profile_picture': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Profile_Info/Profile_Picture/profile_picture.js'),
				'@profile_info': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/Profile_Info/profile_info.js'),
				'@layer_1': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_1/layer_1.js'),
				'@posts': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_2/Posts/posts.js'),
				'@wall': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_2/Wall/wall.js'),
				'@layer_2': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_2/layer_2.js'),
				'@album_cover': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_3/Album/Album_Cover/album_cover.js'),
				'@enlarged_single_photo': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_3/Album/Photos_Container/Single_Photo_Thumbnail/Enlarged_Single_Photo/enlarged_single_photo.js'),
				'@single_photo_thumbnail': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_3/Album/Photos_Container/Single_Photo_Thumbnail/single_photo_thumbnail.js'),
				'@photos_container': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_3/Album/Photos_Container/photos_container.js'),
				'@albums': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_3/Album/albums.js'),
				'@layer_3': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/Components/Layer_3/layer_3.js'),
				'@profile_template': path.resolve(__dirname, './Development/Client/View_Templates/Profile_Template/profile_template.js'),

            }
        }
    };


    module.exports = [serverConfig, clientConfig];