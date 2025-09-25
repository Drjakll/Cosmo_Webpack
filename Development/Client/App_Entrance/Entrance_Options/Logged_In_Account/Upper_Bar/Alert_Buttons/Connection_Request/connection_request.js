import React, { Component } from 'react';
import './connection_request.less';

class Connection_Request extends Component {

    constructor(props) {

        super(props);

        let {account_data} = this.props;

        Connection_Request.contextType = window.Context;

        this.state = {
            request_user_data: {}
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

        this.Get_Request_User_Data();
    }

    Get_Request_User_Data = async ()=>{

        let {data} = this.props;

        let {request_from_id} = data;

        let {find_connections} = this.context.Request_URLs;

        let search_req = {
            key: "id",
            type: "number", 
            value: parseInt(request_from_id),
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

        let {accept_connection_req} = this.context.Request_URLs;

        let {account_data} = this.props;

        let {request_user_data} = this.state;

        let body = {
            accept_user_acc: account_data, //We swap the order because we are making
            user_acc: request_user_data //the requester to add this account first
        };

        await fetch(accept_connection_req, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        window.con_socket.emit("refresh_account", {request_to_email: request_user_data.email});

        window.LoginAttempt();
    }

    Decline_Connection_Request = async (e)=>{

        let {connection_request} = this.context.Request_URLs;

        let {account_data} = this.props;

        let {request_user_data} = this.state;

        let body = {
            request_from: request_user_data,
            request_to: account_data
        };

        console.log(body);

        await fetch(connection_request, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        window.con_socket.emit("refresh_account", {email: request_user_data.email});

        window.LoginAttempt();
    }

    render() {

        let {aws_s3_url} = this.context.Request_URLs

        return <div id="connection-request">

            <div id="request-user-info-wrapper">

                <div id="request-user-photo-wrapper">

                    <img src={`${aws_s3_url}${this.state.request_user_data.profile_picture_link}`} id="request-user-img"/>
                    
                </div>

                <div id="request-user-msg-wrapper">

                    <label id="request-user-name">{`${this.state.request_user_data.first_name} ${this.state.request_user_data.last_name}`} has sent a connection request</label>

                </div>

            </div>

            <div id="request-response-options-wrapper">

                <button onClick={this.Accept_Connection_Request}>Accept</button>

                <button onClick={this.Decline_Connection_Request}>Decline</button>

            </div>

        </div>;
    }
}

export default Connection_Request;