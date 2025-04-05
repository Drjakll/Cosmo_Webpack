import React, { Component, createRef } from 'react';
import {createRoot} from 'react-dom/client';
import Context from './Context/context.js';
import Logo from './Logo//logo.js';
import App_Entrance from './App_Entrance/app_entrance.js';
import Data_Templates from './Data_Templates/account_data.js';
import Request_URLs from './API_Requests/request_urls.js';
import Cookie_Tools from './Utilities/cookie.js';
import Configurations from './Utilities/configurations.js';
import Profile_Template from './Account_Template_Views/Profile/profile_template.js';
import './react_entry.less';
import VideoStream from './Video_Streams/init_point.js';

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
            Data_Templates, //Data templates
            Request_URLs, 
            Cookie_Tools,  //Useful tools for parsing and stringifying cookies
            Configurations, //The app's universal configurations
            Profile_Template //Template for viewing user profile
        }}
        
        >
            
            <App_Entrance />
            
        </Context.Provider>;
            
        return comp;
    }
    
}


const root = createRoot(document.getElementById("root"));
root.render(<Entry/>);



