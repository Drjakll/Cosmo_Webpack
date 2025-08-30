import React, { Component } from 'react';
import Account_Buttons from './Account_Buttons/account_buttons.js';
import './upper_bar.less';

class Upper_Bar extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        return <div id="upper-bar">

            <div id="account-buttons-wrapper">

                <Account_Buttons/>

            </div>

        </div>;
    }
}

export default Upper_Bar;