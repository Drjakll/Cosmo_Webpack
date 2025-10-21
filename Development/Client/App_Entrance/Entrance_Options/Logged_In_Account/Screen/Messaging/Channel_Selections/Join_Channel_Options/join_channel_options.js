import React, {Component} from 'react';
import './join_channel_options.less';

class Join_Channel_Options extends Component {

    constructor(props){
        
        super(props);

        this.state = {
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    render(){

        return (
                <div id="join-channel-options">

                    <div id="the-exit-button" onClick={this.props.exit}></div>

                    <div id="join-channel-options-window">


                    </div>
                    
                </div>
            );
    }
}

export default Join_Channel_Options;