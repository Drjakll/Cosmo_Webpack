import React, {Component} from 'react';
import Stream_List_Components from './Stream_List_Components/stream_list_components.js';
import Video_Stream_Screen from './Video_Stream_Screen/video_stream_screen.js';
import './explore_template.less';

class Explore_Template extends Component {
    
    Screen = {
        "Stream_List_Components": Stream_List_Components,
        "Video_Stream_Screen": Video_Stream_Screen
    };
    
    constructor(props){
        
        super(props);
        
        this.state = {
            account_data: this.props.account_data,
            current_screen: "Stream_List_Components",
            is_host: false,
            stream_id: null
        };
    }
    
    componentDidMount(){
        
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Set_Current_Screen = (screen, is_hosting, stream_id = null) => {
        
        this.setState({current_screen: screen, is_host: is_hosting, stream_id: stream_id});
        
    }
    
    render(){
        
        const Com = this.Screen[this.state.current_screen];
        
        return (
            <div id="explore-template">

                <Com account_data={this.state.account_data} 
                set_current_screen={this.Set_Current_Screen} 
                is_host={this.state.is_host}
                stream_id={this.state.stream_id}
                />

            </div>
        );
    }
}

export default Explore_Template;