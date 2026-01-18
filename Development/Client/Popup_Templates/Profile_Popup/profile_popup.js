import React, {Component, createRef} from 'react';
//import {Profile_Template} from '@profile_template/profile_template.js';
//import Drag from '@root/Utilities/drag.js';
//import Request_URLs from '@root/API_Requests/request_urls.js';
import Context from '@context/context.js';
import './profile_popup.less';

class Profile_Popup extends Component {

    static contextType = Context;

    constructor(props){

        super(props);

        let { this_profile_data, owner_user_account, visitor_user_account} = props;

        this.state = {
            this_profile_data,
            owner_user_account,
            visitor_user_account
        };
    }

    componentDidMount(){

        this.Get_Profile_Account_Info();

    }

    Get_Profile_Account_Info = async ()=>{

        let {this_profile_data} = this.state;

        let {id} = this_profile_data;

        let {get_user_account_data} = this.context.Request_URLs;

        let data = await(await fetch(
            get_user_account_data,
            {
                method: "POST",
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(data){

            this.setState({
                this_profile_data: data.result
            });

        } else {

            alert("Error getting account information!");

        }
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        //this.setState(this.props);

    }

    render(){

        let {Drag, Profile_Template} = this.context;

        let {owner_user_account, visitor_user_account, this_profile_data} = this.state;

        let drag = new Drag();

        let profile_bar_ref = createRef();

        return owner_user_account ? <div id="profile-popup-wrapper" ref={profile_bar_ref}>

            <div id="profile-drag-bar"
                onMouseDown={(e) => { drag.init_child(e, profile_bar_ref.current); }}
                onMouseUp={(e) => { drag.disable_drag(e); }}
            >
                <div id="exit-button" onClick={(e) => { this.props.Exit(); } }>
                    X
                </div>

                <label>
                    drag
                </label>
            </div>

            <div id="profile-template-inner-wrapper">

                <Profile_Template 
                    visitor_user_account={visitor_user_account} 
                    owner_user_account={this_profile_data} 
                    Refresh_Profile_Data={this.Get_Profile_Account_Info}
                />

            </div>

        </div> : <></>;
    }
}

export default Profile_Popup;