import React, { Component } from 'react';
import Account_Buttons from './Account_Buttons/account_buttons.js';
import Alert_Buttons from './Alert_Buttons/alert_buttons.js';
import General_Settings from './General_Settings/general_settings.js';
import './upper_bar.less';

class Upper_Bar extends Component {

    constructor(props) {

        super(props);

        let {account_data, connection_list} = this.props;

        this.state = {
            account_data,
            connection_list
        };

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    render() {

        let {account_data} = this.state;

        return <div id="upper-bar">

            <div id="general-settings-wrapper" className="upper-buttons">

                <General_Settings owner_user_account={account_data} />

            </div>

            <div id="alert-buttons-wrapper" className="upper-buttons">

                <Alert_Buttons account_data={this.state.account_data} connection_list={this.state.connection_list}/>

            </div>

            <div id="account-buttons-wrapper" className="upper-buttons">

                <Account_Buttons account_data={this.state.account_data} />

            </div>

        </div>;
    }
}

export default Upper_Bar;