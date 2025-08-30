import React, {Component} from 'react';
import Connections from './Connections/connections.js';
import Explore from './Explore/explore.js';
import News from './News/news.js';
import Profile from './Profile/profile.js';
import Empty from './Empty/empty.js';
import './screen.less';


class Screen extends Component {
    
    Screen_Types = {
        "Connections": Connections,
        "Explore": Explore,
        "News": News,
        "Profile": Profile,
        "Empty": Empty
    };
    
    constructor(props){
        
        super(props);
        
        this.state = {
            focus_screen: this.props.screen_type,
            account_data: this.props.account_data
        };

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState({
            focus_screen: this.props.screen_type,
            account_data: this.props.account_data
        });
        
    }
    
    render(){
        
        const Screen_Type = this.Screen_Types[this.state.focus_screen];
       
        
        return (
                <div id="screen" tabIndex="0">
                    
                    <Screen_Type account_data={this.state.account_data} />
                    
                </div>
            );
    }
}

export default Screen;