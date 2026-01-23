import React, { Component } from 'react';
import Account_Buttons from './Account_Buttons/account_buttons.js';
import Alert_Buttons from './Alert_Buttons/alert_buttons.js';
import General_Settings from './General_Settings/general_settings.js';
import './upper_bar.less';

class Upper_Bar extends Component {

    constructor(props) {

        super(props);

        let {owner_user_account} = this.props;

        this.state = {
            owner_user_account
        };

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    render() {

        let {owner_user_account} = this.state;

        return <div id="upper-bar">

            <div id="general-settings-wrapper" className="upper-buttons">

                <General_Settings owner_user_account={owner_user_account} />

            </div>

            <div id="alert-buttons-wrapper" className="upper-buttons">

                <Alert_Buttons owner_user_account={owner_user_account} />

            </div>

            <div id="account-buttons-wrapper" className="upper-buttons">

                <Account_Buttons account_data={owner_user_account} />

            </div>

        </div>;
    }
}

export default Upper_Bar;