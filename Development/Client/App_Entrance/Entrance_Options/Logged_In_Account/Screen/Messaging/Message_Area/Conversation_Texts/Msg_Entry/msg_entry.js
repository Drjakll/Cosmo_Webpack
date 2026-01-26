import React, {Component} from 'react';
import './msg_entry.less';

class Msg_Entry extends Component {

    constructor(props){

        super(props);

        let { msg_obj, my_account } = props;

        let {id, first_name, last_name, profile_picture_link, text, read_by, created_on} = msg_obj;

        Msg_Entry.contextType = window.Context;

        this.state = {
            id,
            first_name,
            last_name,
            profile_picture_link, 
            text,
            read_by,
            created_on,
            my_account
        };
    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let { msg_obj, my_account, recipient_info } = this.props;

        let {id, first_name, last_name, profile_picture_link, text, read_by, created_on} = msg_obj;

        this.setState({
            id,
            first_name,
            last_name,
            profile_picture_link, 
            text,
            read_by,
            created_on,
            my_account
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

        let {id, first_name, last_name, profile_picture_link, text, read_by, created_on, my_account} = this.state;

        let {aws_s3_url} = this.context.Request_URLs;

        return <div id="msg-entry"  className={`${id === my_account.id ? "myself" : "others"}`}>

            <div id="the-horizontal-bar"> 

                <div id="time-stamp">

                    {this.Local_Timestamp(created_on)}
                    
                </div>

                <div id="msg-entry-user-info">

                    <div id="profile-pic">
                        
                        <img src={`${aws_s3_url}${profile_picture_link}`} />

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