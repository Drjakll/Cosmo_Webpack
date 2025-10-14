import React, {Component, createRef} from 'react';
import './profile_popup.less';

class Profile_Popup extends Component {

    constructor(props){

        super(props);

        Profile_Popup.contextType = window.Context;

        let {account_data} = props;

        this.state = {
            account_data,
            connection_list: {}
        };
    }

    componentDidMount(){

        this.Get_Connection_List(this.state.account_data);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        this.Get_Connection_List(this.props.account_data);
    }

    Get_Connection_List = async (account_data)=>{

        if(!account_data){
            return;
        }

        let { get_connection_list } = this.context.Request_URLs;

        let body = {
            request: account_data,
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

        let {account_data} = this.state;

        let drag = new Drag();

        let profile_bar_ref = createRef();

        return account_data ? <div id="profile-popup-wrapper" ref={profile_bar_ref}>

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

                <Profile_Template account_data={account_data} connection_list={this.state.connection_list}/>

            </div>

        </div> : <></>;
    }
}

export default Profile_Popup;