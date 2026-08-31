import React, {Component} from 'react';
import Live_Stream from './Live_Stream/live_stream.js';
import Feeds from './Feeds/feeds.js';
import Profile from './Profile/profile_private.js';
import Messaging from './Messaging/messaging.js';
import Search from './Search/search.js';
import Empty from './Empty/empty.js';
import './screen.less';


class Screen extends Component {
    
    Screen_Types = {
        "Livestream": Live_Stream,
        "Feeds": Feeds,
        "Profile": Profile,
        "Chat": Messaging,
        "Search": Search,
        "Empty": Empty
    };
    
    constructor(props){
        
        super(props);
        
        let {owner_user_account, screen_type, all_following_status} = props;

        this.state = {
            focus_screen: screen_type,
            owner_user_account: owner_user_account || {},
            visitor_user_account: owner_user_account || {},
            all_following_status
        };

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);
        
    }
    
    render(){
        
        const Screen_Type = this.Screen_Types[this.state.focus_screen];

        let {owner_user_account, visitor_user_account, all_following_status} = this.state;

        return (
                <div id="screen">
                    
                    <Screen_Type 
                        owner_user_account={owner_user_account} 
                        visitor_user_account={visitor_user_account} 
                        visitor_all_following_status={all_following_status}
                    />
                    
                </div>
            );
    }
}

export default Screen;