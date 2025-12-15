import React, {Component} from 'react';
import './msg_entry.less';

class Msg_Entry extends Component {

    constructor(props){

        super(props);

        let { msg_obj, my_account } = props;

        let {email, first_name, last_name, profile_picture_link, text, read_by, created_on} = msg_obj;

        Msg_Entry.contextType = window.Context;

        this.state = {
            email,
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

        let {email, first_name, last_name, profile_picture_link, text, read_by, created_on} = msg_obj;

        //let recipient_info = await this.Get_Recipient_Info(this.state.from.email);

        this.setState({
            email,
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

       // let recipient_info = await this.Get_Recipient_Info(this.state.from.email);

        //this.setState({recipient_info});

    }

    Get_Recipient_Info = async (email)=>{

        let recipient_info = this.props.check_participant(email);

        if(recipient_info === undefined){

            recipient_info =  await this.Gather_Participant_Info(email);
            
            this.props.store_participant(recipient_info);
        }

        return recipient_info;
    }

    Gather_Participant_Info = async (email)=>{

        let {find_connections} = this.context.Request_URLs;

        let requirements = [{
            value: email,
            type: "string",
            key: "email",
            conjunc: "=",
            logical: "and"
        }];

        let data = await(await fetch(
            find_connections,
            {
                method: "POST",
                body: JSON.stringify({requirements}),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        return data?.result[0];
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

        let {email, first_name, last_name, profile_picture_link, text, read_by, created_on, my_account} = this.state;

        let {aws_s3_url} = this.context.Request_URLs;

        return <div id="msg-entry"  className={`${email === my_account.email ? "myself" : "others"}`}>

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