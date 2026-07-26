import React, { Component } from 'react';
import {Logout} from '@account_access';
import Request_URLs from '@request_urls';
import './account_buttons.less';

class Account_Buttons extends Component {

    constructor(props) {

        super(props);

        let {account_data} = props;

        this.state = {
            account_data
        };
    }

    componentDidMount(){

        window.global_user_socket.on('log_self_off', async ({})=>{

            await this.Logout();

        });

    }

    Logout = async () => {

        await Logout();

        this.props.Change_Screen("Login Account");
    }

    Privacy_Options = async (privacy_value) => {
        
        let {update_profile} = Request_URLs;

        let {account_data} = this.state;

        let {email, id, password} = account_data;

        account_data.privacy = privacy_value;

        let body = {
            credentials: {
                email,
                id,
                password
            },
            to_update: {
                privacy: privacy_value
            }
        };

        await fetch(update_profile, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        this.setState({
            account_data
        });
    }

    Account_Buttons = [
        { label: "Privacy", 
            callback: null, 
            sub_options: [
                {label: "Public", 
                    callback: (e)=>{this.Privacy_Options("public")},
                    sub_options: null,
                    key: "privacy",
                    value: "public"
                },
                {label: "Mutual Only", 
                    callback: (e)=>{this.Privacy_Options("mutual")}, 
                    sub_options: null,
                    key: "privacy",
                    value: "mutual"
                },
                {label: "Private", 
                    callback: (e)=>{this.Privacy_Options("private")}, 
                    sub_options: null,
                    key: "privacy",
                    value: "private"
                }
            ]
        },
        { label: "Logout",
            callback: this.Logout, 
            sub_options: null 
        }
    ];

    Recursion = (button, key) => {

        let { account_data } = this.state;

        let is_selected = button.key && ((account_data[button.key]) === button.value);

        return <div className={`account-item ${is_selected ? 'selected' : ''}`} onClick={button.callback} key={key}>

            {button.label}

            {button.sub_options ? <div className="sub-options">

                {button.sub_options.map((option, index) => {

                    return this.Recursion(option, index);

                })}

            </div> : ""}

        </div>;
    }

    render() {

        return <div id="account-buttons">

            <div id="display-label">
                
                Account

            </div>

            <div id="inner-wrapper">

                {this.Account_Buttons.map((obj, index) => {

                    return this.Recursion(obj, index);

                })}

            </div>

        </div>;
    }
}

export default Account_Buttons;