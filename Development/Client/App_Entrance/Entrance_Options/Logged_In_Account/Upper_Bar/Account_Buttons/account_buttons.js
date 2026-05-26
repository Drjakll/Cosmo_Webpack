import React, { Component } from 'react';
import Context from '@context/context.js';
import './account_buttons.less';

class Account_Buttons extends Component {

    static contextType = Context;

    constructor(props) {

        super(props);

        Account_Buttons.contextType = window.Context;

        let {account_data} = props;

        this.state = {
            account_data
        };
    }

    Logout = (e) => {

        let { Cookie_Tools, Account_Data_Templates } = this.context;
        let { Account_Data_Template } = Account_Data_Templates;
        let { cookie_converter } = Cookie_Tools;

        let account_data = Account_Data_Template({});

        let date = new Date();

        let cookieStrs = cookie_converter(account_data, { "expires": date.toUTCString(), "path": "/" });

        for (let cStr of cookieStrs) {
            document.cookie = cStr;
        }

        this.props.Change_Screen("Login Account");
    }

    Privacy_Options = async (privacy_value) => {
        
        let {update_profile} = this.context.Request_URLs;

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