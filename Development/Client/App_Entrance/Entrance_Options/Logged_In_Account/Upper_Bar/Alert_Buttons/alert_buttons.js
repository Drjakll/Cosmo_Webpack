import React, {Component} from 'react';
import Connection_Request from './Connection_Request/connection_request.js';
import Post_Alert from './Post_Alert/post_alert.js';
import './alert_buttons.less';

class Alert_Buttons extends Component {

    Alert_Types = {
        connection_request: Connection_Request,
        post: Post_Alert
    }

    constructor(props){

        super(props);

        Alert_Buttons.contextType = window.Context;

        let {account_data, connection_list} = this.props;

        this.state = {
            account_data,
            connection_list,
            alerts: [],
            view_profile_data: ""
        };
    }

    componentDidMount(){

        this.Add_Connection_Websocket_Events();

        this.Refresh_Alerts();

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props);

    }

    Add_Connection_Websocket_Events = ()=>{


        global_connection_socket?.on("refresh_alerts", async ({})=>{

            await this.Refresh_Alerts();

        });
    }

    View_Popup_Profile = (account_data)=>{

        const {Profile_Popup} = this.context;

        let comp = <Profile_Popup account_data={account_data} Exit={this.Exit_Popup}/>;

        this.setState({view_profile_data: comp});
    }

    Exit_Popup = ()=>{

        this.setState({
            view_profile_data: ""
        });
    }

    Refresh_Alerts = async ()=>{

            let from_pending_alerts = await this.Get_Alerts("pending");
            let from_connection_alerts = await this.Get_Alerts("accepted");

            let alerts = from_pending_alerts.concat(from_connection_alerts);

            await this.setState({alerts: alerts});
    }

    Get_Alerts = async (status)=>{
        
        let {get_connection_alerts} = this.context.Request_URLs;

        let body = {
            request: this.state.account_data,
            status: status
        };

        let data = await (await fetch(get_connection_alerts,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        return data?.results;
    }

    render(){

        let {alerts} = this.state;

        return <div id="alert-buttons-wrapper">

            {this.state.view_profile_data}

            <div id="alert-buttons">

                <div id="alert-buttons-label">

                    <label>Alerts</label>

                </div>

                <div id="new-alerts-wrapper">

                    {alerts.map((value, index)=>{
                        
                        let Com = this.Alert_Types[value.alert_type];
                        
                        return <div className="alert" key={value.id}>

                                <Com data={value.alert_data} 
                                    account_data={this.state.account_data} 
                                    from_account_email={value.owner_email} 
                                    refresh_alerts={this.Refresh_Alerts}
                                    connection_list={this.state.connection_list}
                                    view_popup_profile={this.View_Popup_Profile}
                                    />

                            </div>;

                    })}

                </div>

            </div>
        </div>;
    }
}

export default Alert_Buttons;