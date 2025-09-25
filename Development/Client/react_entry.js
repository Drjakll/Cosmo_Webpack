import React, { Component, createRef } from 'react';
import {createRoot} from 'react-dom/client';
import Context from './Context/context.js';
import Logo from './Logo//logo.js';
import App_Entrance from './App_Entrance/app_entrance.js';
import Account_Data_Templates from './Data_Templates/account_data.js';
import Comment_Data_Templates from './Data_Templates/comment_data.js';
import Photo_Album_Data_Templates from './Data_Templates/photo_album_data.js';
import Stream_Room_Data_Templates from './Data_Templates/stream_room_data.js';
import Post_Data_Templates from './Data_Templates/post_data.js';
import Request_URLs from './API_Requests/request_urls.js';
import Cookie_Tools from './Utilities/cookie.js';
import Configurations from './Utilities/configurations.js';
import Drag_Scroll from './Utilities/drag_scroll.js';
import Drag from './Utilities/drag.js';
import Upload_Files_To_S3 from './Utilities/upload_files_to_s3.js';
import Profile_Template from './View_Templates/Profile/profile_template.js';
import Explore_Template from './View_Templates/Explore/explore_template.js';
import Calendar from './Misc_Components/Calendar/calendar.js';
import Profile_Popup from './Popup_Templates/Profile_Popup/profile_popup.js';
import Search_Parameters from './Data_Templates/Search_Parameters/search_parameters.js';
import './react_entry.less';

class Entry extends Component {

    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        
        
    } 
    
    render(){
        
        window.Context = Context;
        
        let comp = <Context.Provider 
        
            value={{
                //These are global data
                Logo,
                Stream_Room_Data_Templates, //Stream room data templates
                Account_Data_Templates, //Account data templates
                Comment_Data_Templates, //Comment data templates
                Photo_Album_Data_Templates, //Photo album data templates
                Post_Data_Templates, //Post data templates
                Request_URLs,
                Cookie_Tools,  //Useful tools for parsing and stringifying cookies
                Configurations, //The app's universal configurations
                Profile_Template, //Template for viewing user profile
                Explore_Template, //Template for viewing explore
                Drag_Scroll, //For scrolling within the html element
                Drag, //For dragging any html element
                Calendar,
                Profile_Popup, //Profile template but a popup
                Upload_Files_To_S3, //Use for uploading files to aws s3
                Search_Parameters
            }}
        
        >
            
            <App_Entrance />
            
        </Context.Provider>;
            
        return comp;
    }
    
}


const root = createRoot(document.getElementById("root"));
root.render(<Entry/>);



