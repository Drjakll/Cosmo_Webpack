import React, { Component } from 'react';
import './date_type.less';

class Date_Type extends Component {

    constructor(props) {

        super(props);

        Date_Type.contextType = window.Context;
    }

    Update_Account_Data = async () => {

        let { owner_user_account, variable_name, value } = this.props;
        let { Request_URLs, Cookie_Tools, Configurations } = this.context;
        let { update_profile } = Request_URLs;
        const { cookie_converter } = Cookie_Tools;

        owner_user_account[variable_name] = value;

        let res = await fetch(update_profile, {
            method: "POST",
            body: JSON.stringify(owner_user_account),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let resJson = await res.json();

        if (resJson) {

            const { refresh_account_data } = this.props;

            refresh_account_data();
        }

    }

    render() {

        return <div id="date-type-editor">

            <div id="update-button" onClick={(e) => { this.Update_Account_Data(); }}>Update</div>

        </div>;
    }
}

export default Date_Type;