import React, {Component} from 'react';
import Follow_Request from './Follow_Request/follow_request.js';
import Request_URLs from '@request_urls';
import './alert_buttons.less';

class Alert_Buttons extends Component {

    Alert_Types = {
        "Follow_Request": Follow_Request
    };

    constructor(props){

        super(props);


        let {owner_user_account} = this.props;

        this.state = {
            owner_user_account,
            alerts: {}
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


        window.global_connection_socket.on("refresh_alerts", async ({})=>{

            await this.Refresh_Alerts();
            
        });
    }


    Refresh_Alerts = async ()=>{

        let {alerts} = this.state;

        alerts.Follow_Request = await this.Get_Follow_Requests();

        this.setState({alerts});

    }

    Get_Follow_Requests = async ()=>{
        
        let {get_follow_request_alert} = Request_URLs;

        let {id} = this.state.owner_user_account ?? {};

        if(!id){
            return [];
        }


        let data = await (await fetch(
            `${get_follow_request_alert}/${id}`,
            {
                method: "GET"
            }
        )).json();

        return data?.results;
    }

    render(){

        let {alerts, owner_user_account} = this.state;

        return <div id="alert-buttons-inner-wrapper">

            <div id="alert-buttons">

                <div id="alert-buttons-label">

                    <label>Alerts</label>

                </div>

                <div id="new-alerts-wrapper">

                    {Object.keys(alerts).map((type)=>{
                        
                        let Com = this.Alert_Types[type];

                        let Alerts = alerts[type];
                        
                        return <div className="alert-type-wrapper" key={type}>

                            {Alerts.map((value, index)=>{

                                return <div className="alert" key={`${value.follower_id || index}`}>

                                    <Com value={value} 
                                        owner_user_account={owner_user_account}
                                        Refresh_Alerts={this.Refresh_Alerts}
                                    />

                                </div>;

                            })}

                        </div>
                        

                    })}

                </div>

            </div>
        </div>;
    }
}

export default Alert_Buttons;