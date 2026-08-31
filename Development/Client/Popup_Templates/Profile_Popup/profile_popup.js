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

        let { this_profile_data, owner_user_account, visitor_user_account, visitor_all_following_status} = props;

        this.state = {
            this_profile_data,
            owner_user_account,
            visitor_user_account,
            is_blocked: true,
            profile_error_message: "",
            visitor_all_following_status
        };
    }

    componentWillUnmount(){

    }

    async componentDidMount(){


        this.Get_Profile_Account_Info();

    }

    Get_Profile_Account_Info = async ()=>{

        let {this_profile_data, visitor_user_account} = this.state;

        let {id} = this_profile_data ?? {};

        if(!id || !visitor_user_account?.id){
            this.setState({
                is_blocked: true,
                profile_error_message: "Unable to load this profile."
            });
            return;
        }

        let {view_user_account_data} = Request_URLs;

        let body ={
            target_id: id,
            viewer_id: visitor_user_account.id,
        }

        let data = await(await fetch(
            `${view_user_account_data}`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(!data){

            this.setState({
                is_blocked: true,
                profile_error_message: "Error getting account information!"
            });
            this.props.Exit();

        } else if (data.blocked) {

            this.setState({
                is_blocked: true,
                profile_error_message: data.message
            });
            popup_message("message", data.message);
            this.props.Exit();
        
        }
        else {

            this.setState({
                this_profile_data: data.result,
                is_blocked: false,
                profile_error_message: ""
            });

        }
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }

    render(){

        let {
            owner_user_account,
            visitor_user_account,
            this_profile_data,
            is_blocked,
            profile_error_message,
            visitor_all_following_status
        } = this.state;

        let drag = new Drag();

        let profile_bar_ref = createRef();

        return !is_blocked? 
        
        <Portal>

            <div id="profile-popup-wrapper" ref={profile_bar_ref}>

                <div id="profile-drag-bar"
                    onMouseDown={(e) => { drag.init_child(e, profile_bar_ref.current); }}
                    onMouseUp={(e) => { drag.disable_drag(e); }}
                >
                    <div id="exit-button" onClick={(e) => { this.props.Exit(); } }>
                        &#10008;
                    </div>

                    <label>
                       
                    </label>
                </div>

                <div id="profile-template-inner-wrapper">

                    {is_blocked === true ? 
                    <div id="profile-popup-error-message">
                        {profile_error_message}
                    </div> :
                     <Profile_Public_View 
                        visitor_user_account={visitor_user_account} 
                        owner_user_account={this_profile_data} 
                        Refresh_Profile_Data={this.Get_Profile_Account_Info}
                        visitor_all_following_status={visitor_all_following_status}
                    />}

                </div>

            </div> 

        </Portal>
        
        : "";
    }
}

export default Profile_Popup;
