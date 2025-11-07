import React, {Component} from 'react';
import './other_channel.less';

class Other_Channel extends Component {

    constructor(props){
        
        super(props);

        let {channel_name} = this.props;

        this.state = {
            channel_name,
            users: {}
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
                <div id="other-channel">

                    <label>{this.state.channel_name}</label>
                    
                </div>
            );
    }
}

export default Other_Channel;