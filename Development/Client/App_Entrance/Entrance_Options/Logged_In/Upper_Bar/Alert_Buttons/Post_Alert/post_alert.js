import React, {Component} from 'react';
import './post_alert.less';

class Post_Alert extends Component {

    constructor(props){

        super(props);

        let {data, account_data, from_account_email, connection_list } = props;

        Post_Alert.contextType = window.Context;

        this.state = {
            data : JSON.parse(data || '{}'), 
            account_data,
            from_account_email,
            alert_owner_data: connection_list[from_account_email]
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {data, account_data, from_account_email, connection_list} = this.props;

        data = JSON.parse(data || '{}');

        this.setState({data, 
            account_data, 
            from_account_email,
            alert_owner_data: connection_list[from_account_email]
        });
    }

    render(){

        let {aws_s3_url} = this.context.Request_URLs;

        return <div id="post-alert-wrapper">

            <div id="post-user-info-wrapper">

                <div id="post-user-photo-wrapper">

                    <img src={`${aws_s3_url}${this.state.alert_owner_data?.profile_picture_link}`} id="post-user-img" onClick={(e)=>{ this.props.view_popup_profile(this.state.alert_owner_data); }}/>
                    
                </div>

                <div id="post-user-msg-wrapper">

                    <label id="post-user-name">{`${this.state.alert_owner_data?.first_name} ${this.state.alert_owner_data?.last_name}`} wrote a post today!</label>

                </div>

            </div>

            <div id="post-title-wrapper">

                <label id="post-title-label">Headline as: </label>

                <pre>{this.state.data.title}</pre>

            </div>

        </div>;
    }
}

export default Post_Alert;