import React, { Component } from 'react';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js';
import './viewer_entry.less';

class Viewer_Entry extends Component {

	constructor(props) {

            super(props);

            let {account_data, room_tag, request_live, socket, owner_user_account} = this.props;

            Viewer_Entry.contextType = window.Context;

            this.state = {
                account_data,
                room_tag,
                request_live,
                socket,
                owner_user_account
            };
	}
        
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Generate_Request_Live = (request_live) => {
        
        return request_live ? <div id="request-live-buttons">
            
            
            <div className="button" onClick={(e)=>{this.Answer_To_Request_Live(this.state.room_tag, true);}}>Accept</div>
            <div className="button" onClick={(e)=>{this.Answer_To_Request_Live(this.state.room_tag, false);}}>Decline</div>
            
        </div> : <></>;
    }
    
    Answer_To_Request_Live = (to, answer) => {
        
        this.state.socket?.emit('answer_to_request_live', {to: to, answer: answer});
        
        this.setState({ request_live: false });

        //Let the Viewer_Display component change the request_live to false.
        this.props.request_to_go_live_answered(to);
        
    }

	render() {
                
            let {account_data, owner_user_account} = this.state;
            
            let {first_name, last_name} = account_data;
                
            return <div id="viewer-entry">

                <div id="name">
                
                    {`${first_name} ${last_name}`}
                    
                    {this.Generate_Request_Live(this.state.request_live)}
                    
                </div>
                
                <div id="portrait-wrapper">
                    
                    <Profile_Thumbnail profile={account_data} owner_user_account={owner_user_account} visitor_user_account={owner_user_account} />
                    
                </div>

            </div>;
	}

}

export default Viewer_Entry;