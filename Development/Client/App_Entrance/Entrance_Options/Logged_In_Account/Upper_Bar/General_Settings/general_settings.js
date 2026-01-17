import React, { Component } from 'react';
import Context from '@context/context.js';
import './general_settings.less';

class General_Settings extends Component {

    static contextType = Context;
    
    constructor(props) {

        super(props);

        let {owner_user_account} = props;

        let {privacy } = owner_user_account;

        this.state = {
            owner_user_account,
            selected_privacy: privacy
        };
    }

    Select_Privacy = async (privacy_value) => {

        let {update_profile} = this.context.Request_URLs;

        let {owner_user_account} = this.state;

        let {email, id, password} = owner_user_account;

        owner_user_account.privacy = privacy_value;

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
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        this.setState({
            selected_privacy: privacy_value
        });

    }

    Privacy_Options = {
        public: {label: 'Public', value: 'public'},
        mutual: {label: 'Mutual Only', value: 'mutual'},
        private: {label: 'Private', value: 'private'}
    }

    render() {

        let {selected_privacy} = this.state;

        return <div id="general-settings">
            
            <div id="available-privacy-options">

                <div id="selected-privacy-label">
                    {this.Privacy_Options[selected_privacy].label}
                </div>

                <div id="privacy-options-list">

                    {Object.keys(this.Privacy_Options).map((key)=>{

                        let {label, value} = this.Privacy_Options[key];

                        return selected_privacy === value ? "" : 
                        <div key={value} className="privacy-option-item" onClick={()=>{

                            this.Select_Privacy(value);
                            
                        }}>

                            {label}

                        </div>;

                    })}

                </div>

            </div>

        </div>;
    }
}

export default General_Settings;