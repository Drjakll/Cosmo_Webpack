import React, { Component } from 'react';
import './viewer_entry.less';

class Viewer_Entry extends Component {

	constructor(props) {

            super(props);

            let {account_data, room_tag, request_live, socket} = this.props;

            Viewer_Entry.contextType = window.Context;

            this.state = {
                account_data: account_data,
                room_tag: room_tag,
                request_live: request_live,
                socket: socket
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
                
                <div id="label">Request Live: </div>
                <div id="button" onClick={(e)=>{this.Answer_To_Request_Live(this.state.room_tag, true);}}>Accept</div>
                <div id="button" onClick={(e)=>{this.Answer_To_Request_Live(this.state.room_tag, false);}}>Decline</div>

            </div> : <></>;
        }
        
        Answer_To_Request_Live = (to, answer) => {
            
            this.state.socket?.emit('answer_to_request_live', {to: to, answer: answer});
            
            this.setState({request_live: false});
            
        }

	render() {
            
            let {Request_URLs} = this.context;
            
            let {aws_s3_url} = Request_URLs;
                
            let {account_data} = this.state;
            
            let {first_name, last_name, profile_picture_link} = account_data;
                
            return <div id="viewer-entry">

                <div id="name">
                
                    {`${first_name} ${last_name}`}
                    
                    {this.Generate_Request_Live(this.state.request_live)}
                    
                </div>
                
                <div id="portrait-wrapper">
                    
                    <div id="portrait" style={{backgroundImage: `url('${aws_s3_url}${profile_picture_link}')`}}>
                        
                    </div>
                    
                </div>

            </div>;
	}

}

export default Viewer_Entry;