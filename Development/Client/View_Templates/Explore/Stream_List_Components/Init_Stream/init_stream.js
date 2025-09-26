import React, {Component} from 'react';
import './init_stream.less';


class Init_Stream extends Component {

    
    constructor(props){
        
        super(props);
        
        this.state = {
            
        };

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);
        
    }
    
    Prepare_To_Stream = () => {
        
        this.props.properties.set_current_screen("Video_Stream_Screen", true);
        
    }
    
    render(){
        
        return (
                <div id="init-stream">
                    
                    <div id="buttons">
                    
                        <div id="ready-button-wrapper">
                        
                            <div id="ready-button" onClick={this.Prepare_To_Stream}>
                            
                                Go Live!
                                
                            </div>
                
                        </div>

                    </div>
                    
                </div>
            );
    }
}

export default Init_Stream;