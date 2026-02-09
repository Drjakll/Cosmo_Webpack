import React, {Component} from 'react';
import Explore from './Explore/explore.js';
import Feeds from './Feeds/feeds.js';
import Profile from './Profile/profile.js';
import Messaging from './Messaging/messaging.js';
import Search from './Search/search.js';
import Empty from './Empty/empty.js';
import './screen.less';


class Screen extends Component {
    
    Screen_Types = {
        "Livestream": Explore,
        "Feeds": Feeds,
        "Profile": Profile,
        "Messaging": Messaging,
        "Search": Search,
        "Empty": Empty
    };
    
    constructor(props){
        
        super(props);
        
        let {owner_user_account, screen_type} = props;

        this.state = {
            focus_screen: screen_type,
            owner_user_account: owner_user_account || {},
            visitor_user_account: owner_user_account || {}
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

        let {owner_user_account, visitor_user_account} = this.state;
        
        return (
                <div id="screen">
                    
                    <Screen_Type 
                        owner_user_account={owner_user_account} 
                        visitor_user_account={visitor_user_account} 
                    />
                    
                </div>
            );
    }
}

export default Screen;