import React, { Component } from 'react';
import Context from '@context/context.js';
import './text_type.less';

class Text_Type extends Component {

    constructor(props) {

        super(props);

        Text_Type.contextType = Context;

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


        return <div id="text-type-editor">

            <div id="update-button" onClick={(e) => { this.Update_Account_Data(); }}>Update</div>
            
        </div>;
    }
}

export default Text_Type;