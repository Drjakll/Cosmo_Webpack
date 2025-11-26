import React, {Component, createRef} from 'react';
import './profile_popup.less';

class Profile_Popup extends Component {

    constructor(props){

        super(props);

        Profile_Popup.contextType = window.Context;

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            connection_list: {}
        };
    }

    componentDidMount(){

        this.Get_Connection_List(this.state.owner_user_account);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        this.Get_Connection_List(this.props.owner_user_account);
    }

    Get_Connection_List = async (owner_user_account)=>{

        if(!owner_user_account){
            return;
        }

        let { get_connection_list } = this.context.Request_URLs;

        let body = {
            request: owner_user_account,
            status: "accepted"
        };

        let data = await (await fetch(
            get_connection_list, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            let {results} = data;

            let jsonObj_results = {};

            for(let entry of results){
                jsonObj_results[entry.email] = entry;
            }

            this.setState({connection_list: jsonObj_results});

        }
    }

    render(){

        const { Profile_Template, Drag } = this.context;

        let {owner_user_account, visitor_user_account} = this.state;

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

                <Profile_Template visitor_user_account={visitor_user_account} owner_user_account={owner_user_account} connection_list={this.state.connection_list}/>

            </div>

        </div> : <></>;
    }
}

export default Profile_Popup;