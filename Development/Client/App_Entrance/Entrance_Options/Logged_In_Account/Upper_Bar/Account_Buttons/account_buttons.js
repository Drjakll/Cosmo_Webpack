import React, { Component } from 'react';
import './account_buttons.less';

class Account_Buttons extends Component {

    constructor(props) {

        super(props);

        Account_Buttons.contextType = window.Context;
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

        location.reload();
    }

    Account_Buttons = [
        { label: "Logout", callback: this.Logout }
    ];

    render() {

        return <div id="account-buttons">

            <div id="display-label">
                
                Account

            </div>

            <div id="inner-wrapper">

                {this.Account_Buttons.map((obj, index) => {

                    return <div className="account-item" onClick={obj.callback} key={index}>

                        {obj.label}

                    </div>
                })}

            </div>

        </div>;
    }
}

export default Account_Buttons;