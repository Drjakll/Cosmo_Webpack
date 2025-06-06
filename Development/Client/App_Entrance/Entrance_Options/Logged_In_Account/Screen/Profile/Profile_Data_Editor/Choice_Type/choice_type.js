import React, { Component } from 'react';
import './choice_type.less';

class Choice_Type extends Component {

    constructor(props) {

        super(props);

        Choice_Type.contextType = window.Context;
    }

    Update_Account_Data = async () => {

        let { account_data, variable_name, value } = this.props;
        let { Request_URLs, Cookie_Tools, Configurations } = this.context;
        let { update_profile } = Request_URLs;
        const { cookie_converter } = Cookie_Tools;

        account_data[variable_name] = value;

        let body = account_data;

        let res = await fetch(update_profile, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let resJson = await res.json();

        if (resJson) {

            let date = new Date();

            date.setTime(date.getTime() + Configurations.Cookie_Expire_Days * 24 * 60 * 60 * 1000);

            let cookieStrs = cookie_converter(account_data, { "expires": date.toUTCString(), "path": "/" });

            for (let cookieStr of cookieStrs) {
                document.cookie = cookieStr;
            }

            const { refresh_account_data } = this.props;

            refresh_account_data();
        }

    }

    render() {

        return <div id="choice-type-editor">

            <div id="update-button" onClick={(e) => { this.Update_Account_Data(); }}>Update</div>

        </div>;
    }
}

export default Choice_Type;