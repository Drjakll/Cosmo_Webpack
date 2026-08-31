import React, { Component } from 'react';
import './connection_request.less';

class Connection_Request extends Component {

    constructor(props) {

        super(props);

        Connection_Request.contextType = window.Context;

        this.state = {
            request_user_data: null,
            connection_list: this.props.connection_list,
        };

    }

    componentDidMount(){

        this.Get_Request_User_Data();

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        if(!this.state.request_user_data){
            this.Get_Request_User_Data();
        }
    }

    Get_Request_User_Data = async ()=>{

        let {from_account_email} = this.props;

        let {find_connections} = this.context.Request_URLs;

        let search_req = {
            key: "email",
            type: "string", 
            value: from_account_email,
            conjunc: "="
        };

        let result = await( await fetch(find_connections, {
            method: "POST",
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({requirements: [search_req]})
        })).json();

        if(result?.result?.length > 0){

            this.setState({
                request_user_data: result.result[0]
            });
        }

    }

    Accept_Connection_Request = async (e)=>{

        let {accept_connection_request} = this.context.Request_URLs;

        let {account_data} = this.props;

        let {request_user_data} = this.state;

        let body = {
            request_from: request_user_data, //The account that is making the request
            request_to: account_data, //To the recipient of the request is being asked
            status: "accepted" 
        };

        await fetch(accept_connection_request, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        this.props.refresh_alerts(); //Refresh self alerts

        //Refresh self connection list status
        window.global_connection_socket?.emit("refresh_connection_list", {user_id: account_data.id}); 

        //Refresh the other party's connection list status
        window.global_connection_socket?.emit("refresh_connection_list", {user_id: request_user_data.id});
    }

    Decline_Connection_Request = async (e)=>{

        let {remove_connection_request} = this.context.Request_URLs;

        let {account_data} = this.props;

        let {request_user_data} = this.state;

        let body = {
            request_from: request_user_data,
            request_to: account_data
        };

        await fetch(remove_connection_request, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        this.props.refresh_alerts(); //Refresh self alerts

    }

    render() {

        let {aws_s3_url} = this.context.Request_URLs;

        return <div id="connection-request">

            <div id="request-user-info-wrapper">

                <div id="request-user-photo-wrapper">

                    <img src={`${aws_s3_url}${this.state.request_user_data?.profile_picture_link}`} id="request-user-img" onClick={(e)=>{ this.props.view_popup_profile(this.state.request_user_data); }}/>
                    
                </div>

                <div id="request-user-msg-wrapper">

                    <label id="request-user-name">{`${this.state.request_user_data?.first_name} ${this.state.request_user_data?.last_name}`} has sent a connection request</label>

                </div>

            </div>

            {this.state.connection_list[this.state.request_user_data?.email] ? 

                <div id="request-response-options-wrapper">Accepted</div> 

                :
                
                <div id="request-response-options-wrapper">

                    <button onClick={this.Accept_Connection_Request}>Accept</button>

                    <button onClick={this.Decline_Connection_Request}>Decline</button>

                </div>
            }

        </div>;
    }
}

export default Connection_Request;