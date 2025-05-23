import React, { Component } from 'react';
import './viewer_entry.less';

class Viewer_Entry extends Component {

	constructor(props) {

            super(props);

            let {account_data, room_tag} = this.props;

            Viewer_Entry.contextType = window.Context;

            this.state = {
                account_data: account_data,
                room_tag: room_tag
            };
	}
        
        

	render() {
            
            let {Request_URLs} = this.context;
            
            let {aws_s3_url} = Request_URLs;
                
            let {account_data} = this.state;
            
            let {first_name, last_name, profile_picture_link} = account_data;
                
            return <div id="viewer-entry">

                <div id="name">
                
                    {`${first_name} ${last_name}`}
                    
                </div>
                
                <div id="portrait-wrapper">
                    
                    <div id="portrait" style={{backgroundImage: `url('${aws_s3_url}${profile_picture_link}')`}}>
                        
                    </div>
                    
                </div>

            </div>;
	}

}

export default Viewer_Entry;