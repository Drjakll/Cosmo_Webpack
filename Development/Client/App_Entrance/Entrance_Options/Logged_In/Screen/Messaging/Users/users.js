import React, {Component, createRef} from 'react';
import User_Thumbnail from './User_Thumbnail/user_thumbnail.js';
import Request_URLs from '@request_urls';
import Portal from '@portal';
import Profile_Popup from '@profile_popup';
import Drag_Scroll from '@drag_scroll';
import './users.less';

class Users extends Component {

    constructor(props){
        
        super(props);

        let {visible_users} = this.props;

        this.state = {
            visible_users,
            selected_user_profile: null, //To handle user selection for profile viewing
            owner_user_account: this.props.owner_user_account,
            selected_users: this.props.selected_users
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Show_User_Profile = async (user_profile_data)=>{

        if(!user_profile_data){
            return;
        }

        let {id} = user_profile_data;

        let { get_user_account_data} = Request_URLs;

        let data = await(await fetch(`${get_user_account_data}/${id}`,
            {
                method: "GET"
            }
        )).json();

        if(!data){
            return;
        }

        this.setState({
            selected_user_profile: data.result
        });

    }

    render(){

        let {visible_users, selected_user_profile, selected_users, owner_user_account} = this.state;

        
        let drag_scroll = new Drag_Scroll();
        
        let listRef = createRef();

        return (
                <div id="users">

                    {selected_user_profile ? 
                    <Portal>

                        <Profile_Popup visitor_user_account={owner_user_account} 
                            owner_user_account={owner_user_account} 
                            this_profile_data={selected_user_profile}
                            Exit={(e)=>{ this.setState({selected_user_profile: null}); }}/> 

                    </Portal>
                    : ""}

                    <div id="users-list"

                        ref={listRef}

                        onMouseDown={(e) => {
                            drag_scroll.init_drag(e, listRef.current);
                        }}

                        onMouseLeave={(e) => {
                            drag_scroll.disable_drag(e, listRef.current);
                        }}

                        onMouseUp={(e) => {
                            drag_scroll.disable_drag(e, listRef.current);
                        }}

                        onMouseMove={(e) => {
                            drag_scroll.move_drag(e, listRef.current);
                        }}
                    >

                        {Object.keys(visible_users).map((key, index) => {

                            let user = visible_users[key];

                            return user.id === this.state.owner_user_account.id ? "" : 
                            
                            <div key={index} className="user-wrapper">

                                <User_Thumbnail 
                                    key={index} 
                                    user_profile_data={user} 
                                    show_user_profile={this.Show_User_Profile} 
                                    owner_user_account={this.state.owner_user_account}
                                    refresh_conversation_list={this.props.refresh_conversation_list}
                                    selected={selected_users[user.id] ? true : false}
                                    select_user={this.props.select_user}
                                />

                            </div>;

                        })}

                    </div>
                    
                </div>
            );
    }
}

export default Users;