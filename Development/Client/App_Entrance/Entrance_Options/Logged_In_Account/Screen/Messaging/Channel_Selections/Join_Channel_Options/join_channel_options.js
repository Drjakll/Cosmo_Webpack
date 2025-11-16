import React, {Component} from 'react';
import './join_channel_options.less';

class Join_Channel_Options extends Component {

    Search_Options = {
        channel_name: {
            display_name: "Channel Name", 
            type: "text",
            element: <input type="text" placeHolder="Channel Name" onChange={(e)=>{ this.Set_Text_Requirement("channel_name", e.target.value); }}/>
        }
    }

    Requirement_Input = {

    }

    constructor(props){
        
        super(props);

        let {public_channels_search_results} = this.props;

        this.state = {
            new_channel_name: "",
            available_search_options: this.Search_Options,
            attached_search_requirements: {},
            public_channels_search_results
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

        if(new_channel_name.length === 0){
            alert("Channel name cannot be empty");
            return;
        }

        let new_channel_obj = {};

        new_channel_obj[new_channel_name] = {channel_name: new_channel_name, messages: []};

        this.props.join_public_channels(new_channel_obj);

    }

    Attach_Search_Requirement = (key)=>{

        let {attached_search_requirements, available_search_options} = this.state;

        attached_search_requirements[key] = available_search_options[key];

        delete available_search_options[key];

        this.setState({attached_search_requirements, available_search_options});
    }

    Remove_Search_Requirement = (key)=>{

        let {attached_search_requirements, available_search_options} = this.state;
        
        available_search_options[key] = attached_search_requirements[key];

        delete attached_search_requirements[key];

        delete this.Requirement_Input[key];

        this.setState({attached_search_requirements, available_search_options});
    }

    Set_Text_Requirement = (key, value)=>{

        this.Requirement_Input[key] = value;
    }

    Search_Channels = ()=>{

        this.props.msg_socket.emit('search_public_chats', {search_req: this.Requirement_Input});

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

                                    {Object.keys(this.state.public_channels_search_results).length === 0 ? 
                                    
                                        <div id="no-channels-found-label">
                                            No Channels Found
                                        </div>
                                    
                                    :

                                        Object.keys(this.state.public_channels_search_results).map((key, index)=>{

                                            let channel_obj = this.state.public_channels_search_results[key];

                                            return (
                                                <div key={index} className="existing-channel-option">

                                                    <label>{channel_obj.channel_name}</label>

                                                    <div id="join-existing-channel-button-wrapper">

                                                        <button onClick={()=>{
                                                            
                                                        }}>
                                                            Join Channel
                                                        </button>

                                                    </div>

                                                </div>
                                            );

                                        })
                                    }

                                </div>

                            </div>

                            <div id="search-channel-wrapper">

                                <div id="search-requirements">

                                    <div id="available-search-requirements-label">
                                        Add Search Requirements
                                    </div>

                                    {Object.keys(this.state.available_search_options).map((key, index)=>{

                                        return (
                                            <div 
                                                key={index} 
                                                className="search-requirement-option" 
                                                onClick={()=>{this.Attach_Search_Requirement(key)}}
                                            >

                                                {this.state.available_search_options[key].display_name}

                                            </div>
                                        );

                                    })}

                                </div>

                                <div id="attached-search-requirements">

                                    {Object.keys(this.state.attached_search_requirements).map((key, index)=>{

                                        let {display_name, element} = this.state.attached_search_requirements[key];

                                        return (
                                            <div 
                                                key={index} 
                                                className="attached-search-requirement-option" 
                                            >
                                                <label>{display_name}:</label>

                                                <div id="attached-search-requirement-element">
                                                    {element}
                                                </div>

                                                <div id="remove-attached-requirement-button"
                                                    onClick={()=>{this.Remove_Search_Requirement(key)}}> 
                                                    Remove 
                                                </div>

                                            </div>
                                        );

                                    })}

                                    <div id="search-channels-button-wrapper">

                                        <button onClick={this.Search_Channels}>Search Channels</button>

                                    </div>


                                </div>

                            </div>

                        </div>

                    </div>
                    
                </div>
            );
    }
}

export default Join_Channel_Options;