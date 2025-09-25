import React, {Component} from 'react';
import Connection_Request from './Connection_Request/connection_request.js';
import { io } from 'socket.io-client';
import './alert_buttons.less';

class Alert_Buttons extends Component {

    Alert_Types = {
        connection_request: Connection_Request
    }

    constructor(props){

        super(props);

        Alert_Buttons.contextType = window.Context;

        let {account_data} = this.props;

        this.state = {
            account_data
        };
    }

    componentDidMount(){

        window.addEventListener("beforeunload", (e)=>{

            window.con_socket.emit("logging_off", {email: this.state.account_data.email});

        });

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props);

        if(prevState.account_data?.id !== this.state.account_data?.id){
            this.Connect_Websocket();
        }
    }

    Connect_Websocket = ()=>{

        window.con_socket = io("/connections");

        con_socket.on("connect", async ()=>{

            con_socket.emit("newly_logged_in", {email: this.state.account_data.email});

        });

        con_socket.on("refresh_account", async ({})=>{

            let refreshed_acc_data = await window.LoginAttempt();

            this.setState({account_data: refreshed_acc_data});

        });
    }

    render(){

        let {alerts} = this.state.account_data ?  this.state.account_data : {alerts: "{}"};

        alerts = alerts && alerts !== "null" ? JSON.parse(alerts) : {};

        return <div id="alert-buttons">

            <div id="alert-buttons-label">

                <label>Alerts</label>

            </div>

            <div id="new-alerts-wrapper">

                {Object.keys(alerts).map((key, index)=>{

                    let value = alerts[key];
                    
                    let Com = this.Alert_Types[value.type];

                    return <div className="alert" key={index}>

                            <Com data={value.data} account_data={this.state.account_data}/>

                        </div>;

                })}

            </div>
            
        </div>;
    }
}

export default Alert_Buttons;