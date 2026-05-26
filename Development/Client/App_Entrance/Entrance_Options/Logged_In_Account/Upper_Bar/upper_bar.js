import React, { Component } from 'react';
import Account_Buttons from './Account_Buttons/account_buttons.js';
import Alert_Buttons from './Alert_Buttons/alert_buttons.js';
import Online_Users from './Online_Users/online_users.js';
import Context from '@context/context.js';
import './upper_bar.less';

class Upper_Bar extends Component {

    static contextType = Context;

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

        let {Logo} = this.context;

        return <div id="upper-bar">
            
            <div id="logo-wrapper" className="upper-butttons">

                <Logo style={
                        {
                            wrapper: {
                                padding: "5px 40px 5px 40px",
                                fontSize: "13px",
                                border: "rgba(0,0,0,0.5) solid 1px"
                            }, 
                            cos: {
                                fontSize: "1em"
                            }, 
                            mo: {
                                fontSize: "1em"
                            }
                        }
                    }
                />

            </div>

            <div id="online-users-wrapper" className="upper-buttons">

                <Online_Users owner_user_account={owner_user_account} />

            </div>

            <div id="alert-buttons-wrapper" className="upper-buttons">

                <Alert_Buttons owner_user_account={owner_user_account} />

            </div>

            <div id="account-buttons-wrapper" className="upper-buttons">

                <Account_Buttons 
                    account_data={owner_user_account} 
                    Change_Screen={this.props.Change_Screen}
                />

            </div>

        </div>;
    }
}

export default Upper_Bar;