import React, {Component} from 'react';
import './join_channel_options.less';

class Join_Channel_Options extends Component {

    constructor(props){
        
        super(props);

        this.state = {
            new_channel_name: ""
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Set_Channel_Name = (e)=>{

        this.setState({new_channel_name: e.target.value});
    }

    Create_Channel = (e)=>{

        let {new_channel_name} = this.state;

        this.props.create_public_channel({channel_name: new_channel_name});

    }

    render(){

        return (
                <div id="join-channel-options">

                    <div id="the-exit-button" onClick={this.props.exit}></div>

                    <div id="join-channel-options-window">

                        <div id="join-channel-top">

                            <div id="channel-name-wrapper">

                                <input type="text" maxLength="24" onChange={this.Set_Channel_Name} />

                                <div id="characters-remain">

                                    Characters remain: {24 - this.state.new_channel_name.length}

                                </div>

                            </div>

                            <div id="create-channel-button-wrapper">

                                <button onClick={this.Create_Channel}>Create Channel</button>

                            </div>

                        </div>

                        <div id="join-channel-bottom">

                            <div id="join-channel-inner-wrapper">

                                <div id="existing-channel-name-wrapper">

                                </div>

                            </div>

                            <div id="search-channel-wrapper">

                                <div id="search-requirements">

                                </div>

                                <div id="attached-search-requirements">



                                </div>

                            </div>

                        </div>

                    </div>
                    
                </div>
            );
    }
}

export default Join_Channel_Options;