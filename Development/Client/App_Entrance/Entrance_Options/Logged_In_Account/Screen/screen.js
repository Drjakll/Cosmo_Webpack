import React, {Component} from 'react';
import Connections from './Connections/connections.js';
import Explore from './Explore/explore.js';
import News from './News/news.js';
import Profile from './Profile/profile.js';
import './screen.less';


class Screen extends Component {
    
    Screen_Types = {
        "Connections": Connections,
        "Explore": Explore,
        "News": News,
        "Profile": Profile
    };
    
    constructor(props){
        
        super(props);
        
        this.state = {
            focus_screen: this.props.screen_type
        };

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState({
            focus_screen: this.props.screen_type
        });
        
    }
    
    render(){
        
        const Screen_Type = this.Screen_Types[this.state.focus_screen];
        
        return (
                <div id="screen">
                    
                    <Screen_Type />
                    
                </div>
            );
    }
}

export default Screen;