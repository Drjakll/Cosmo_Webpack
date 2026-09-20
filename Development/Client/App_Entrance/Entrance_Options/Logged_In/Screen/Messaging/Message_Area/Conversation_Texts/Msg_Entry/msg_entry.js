import React, {Component} from 'react';
import Request_URLs from '@request_urls';
import Profile_Thumbnail from '@profile_thumbnail';
import './msg_entry.less';

class Msg_Entry extends Component {

    constructor(props){

        super(props);

        let { msg_obj, my_account, visitor_all_following_status } = props;

        let {sender_id, first_name, last_name, profile_picture_link, text, created_on} = msg_obj;

        this.state = {
            sender_id,
            first_name,
            last_name,
            profile_picture_link, 
            text,
            created_on,
            my_account,
            visitor_all_following_status
        };
    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let { msg_obj, my_account, visitor_all_following_status } = this.props;

        let {sender_id, first_name, last_name, profile_picture_link, text, read_by, created_on} = msg_obj;

        this.setState({
            sender_id,
            first_name,
            last_name,
            profile_picture_link, 
            text,
            read_by,
            created_on,
            my_account,
            visitor_all_following_status
        });

    }

    async componentDidMount(){


    }


    Local_Timestamp = (utc_time_ms)=>{

        let timeStr = new Date(utc_time_ms).toLocaleDateString("en-US", 
            {year: "numeric",
             month: "long",
             day: "numeric",
             hour: "numeric",
             minute: "2-digit",
             second: "2-digit",
             hour12: true
            });

        //let [date, time] = timeStr.split(",");

        return timeStr.replace("at", ",");//`${date} ${time}`;

    }

    render(){

        let {sender_id, first_name, last_name, profile_picture_link, text, created_on, my_account, visitor_all_following_status} = this.state;
        
        

        //let {aws_s3_url} = Request_URLs;

        return <div id="msg-entry"  className={`${sender_id === my_account.id ? "myself" : "others"}`}>

            <div id="the-horizontal-bar"> 

                <div id="time-stamp">

                    {this.Local_Timestamp(created_on)}
                    
                </div>

                <div id="msg-entry-user-info">

                    <div id="profile-pic">
                        
                        <Profile_Thumbnail 
                            profile={{id: sender_id, profile_picture_link}}
                            generate_options_disabled={true}
                            owner_user_account={my_account}
                            visitor_user_account={my_account}
                            rounded_portrait={true}
                            visitor_all_following_status={visitor_all_following_status}
                        />
                        {/*<img src={`${aws_s3_url}${profile_picture_link}`} />*/}

                    </div>

                    <div id="user-full-name">

                        {first_name} {last_name}

                    </div>

                </div>

                <div id="msg-wrapper">

                    <pre>{text}</pre>

                </div>

            </div>

        </div>;
    }
}

export default Msg_Entry;