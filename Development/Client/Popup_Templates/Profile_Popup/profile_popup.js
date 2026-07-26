import React, {Component, createRef} from 'react';
import Drag from '@drag';
import Request_URLs from '@request_urls';
import Profile_Public_View from '@public_profile_view';
import Portal from '@portal';
import popup_message from '@popup_message';
import './profile_popup.less';

class Profile_Popup extends Component {

    constructor(props){

        super(props);

        let { this_profile_data, owner_user_account, visitor_user_account} = props;

        this.state = {
            this_profile_data,
            owner_user_account,
            visitor_user_account,
            is_blocked: true
        };
    }

    async componentDidMount(){

        const is_blocked = await this.Is_Visitor_Blocked();

        if(is_blocked){

            this.props.Exit();

            return;
        }

        this.setState({is_blocked: false});

        this.Get_Profile_Account_Info();

    }

    Get_Profile_Account_Info = async ()=>{

        let {this_profile_data} = this.state;

        let {id} = this_profile_data;

        let {get_user_account_data} = Request_URLs;

        let data = await(await fetch(
            `${get_user_account_data}/${id}`,
            {
                method: "GET"
            }
        )).json();

        if(!data){

            popup_message("message","Error getting account information!");

        } 
        else {

            this.setState({
                this_profile_data: data.result
            });

        }
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }

    Is_Visitor_Blocked = async ()=>{

        let {this_profile_data, visitor_user_account} = this.props;

        let {id: viewer_id} =  visitor_user_account;
        let {id: target_id} = this_profile_data;

        let {is_user_blocked} = Request_URLs;

        let body = {
            viewer_id,
            target_id
        };

        let data = await(await fetch(is_user_blocked, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        })).json();

        if(data?.blocked === true){
            await popup_message("message", data.message);
            return true;
        }

        return false;

    }

    render(){

        let {owner_user_account, visitor_user_account, this_profile_data, is_blocked} = this.state;

        let drag = new Drag();

        let profile_bar_ref = createRef();

        return owner_user_account ? 
        
        <Portal>

            <div id="profile-popup-wrapper" ref={profile_bar_ref}>

                <div id="profile-drag-bar"
                    onMouseDown={(e) => { drag.init_child(e, profile_bar_ref.current); }}
                    onMouseUp={(e) => { drag.disable_drag(e); }}
                >
                    <div id="exit-button" onClick={(e) => { this.props.Exit(); } }>
                        X
                    </div>

                    <label>
                       
                    </label>
                </div>

                <div id="profile-template-inner-wrapper">

                    {is_blocked === true ? "" :
                     <Profile_Public_View 
                        visitor_user_account={visitor_user_account} 
                        owner_user_account={this_profile_data} 
                        Refresh_Profile_Data={this.Get_Profile_Account_Info}
                    />}

                </div>

            </div> 

        </Portal>
        
        : <></>;
    }
}

export default Profile_Popup;