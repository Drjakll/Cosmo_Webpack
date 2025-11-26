import React, {Component} from 'react';
import Search_Streams from './Search_Streams/search_streams.js';
import Stream_Displays from './Stream_Displays/stream_displays.js';
import Init_Stream from './Init_Stream/init_stream.js';
import './stream_list_components.less';

class Stream_List_Components extends Component {
    
    constructor(props){
        
        super(props);
        
        //this.props.set_current_screen is a callback from the explore_template.js
        this.state = {
            components: [
                {component: Search_Streams, classname: "search-streams", props: {owner_user_account: this.props.owner_user_account, search_streams: this.props.search_streams}},
                {component: Stream_Displays, classname: "stream-displays", props: {set_current_screen: this.props.set_current_screen}},
                {component: Init_Stream, classname: "init-stream", props: {set_current_screen: this.props.set_current_screen}}
            ],
            owner_user_account: this.props.owner_user_account,
            active_streams: this.props.active_streams
        };
    }
    
    componentDidMount(){
        
    } 
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState({owner_user_account: this.props.owner_user_account, active_streams: this.props.active_streams});
    }
    
    UpdateComponentProps = (index, newProps) => {
        
        for(let i in newProps){
            
            this.state.components[index].props[i] = newProps[i];
            
        } 
        
        
        this.setState({components: this.state.components});
        
    }
    
    UpdateAllComponentProps = (newProps) => {
        
        for(let h in this.state.components){
            
            for(let i in newProps){
            
                this.state.components[h].props[i] = newProps[i];
                
            }
        }
        
        this.setState({components: this.state.components});
    }
    
    render(){
            return (
                <div id="stream-list-component">
                    
                    <div id="components-wrapper">
                    
                        {this.state.components.map((com, index)=>{
                            
                            const Com = com.component;
                            
                            return <div className={`component ${com.classname}`} key={index}>
                                
                                <Com properties={com.props} owner_user_account={this.state.owner_user_account} active_streams={this.state.active_streams} />
            
                            </div>;
                            
                        })}
                    
                    </div>
                    
                </div>
            );
    }
}

export default Stream_List_Components;