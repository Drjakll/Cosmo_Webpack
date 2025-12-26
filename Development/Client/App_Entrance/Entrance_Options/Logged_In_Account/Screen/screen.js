import React, {Component} from 'react';
import Explore from './Explore/explore.js';
import News from './News/news.js';
import Profile from './Profile/profile.js';
import Messaging from './Messaging/messaging.js';
import Empty from './Empty/empty.js';
import './screen.less';


class Screen extends Component {
    
    Screen_Types = {
        "Livestream": Empty,
        "News": Empty,
        "Profile": Profile,
        "Messaging": Empty,
        "Empty": Empty
    };
    
    constructor(props){
        
        super(props);
        
        let {owner_user_account, screen_type, connection_list} = props;

        this.state = {
            focus_screen: screen_type,
            owner_user_account: owner_user_account || {},
            visitor_user_account: owner_user_account || {},
            connection_list: connection_list
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
                <div id="screen" tabIndex="0">
                    
                    <Screen_Type 
                        owner_user_account={owner_user_account} 
                        visitor_user_account={visitor_user_account} 
                        connection_list={this.state.connection_list}/>
                    
                </div>
            );
    }
}

export default Screen;