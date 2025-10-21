import React, {Component} from 'react';
import User_Thumbnail from './User_Thumbnail/user_thumbnail.js';
import './users.less';

class Users extends Component {

    constructor(props){
        
        super(props);

        let {visible_users} = this.props;

        Users.contextType = window.Context;

        this.state = {
            visible_users,
            selected_user: null //To handle user selection for profile viewing
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Show_User_Profile = (user_profile_data)=>{

        this.setState({
            selected_user: user_profile_data
        });

    }

    render(){

        let {visible_users, selected_user} = this.state;

        let {Profile_Popup} = this.context;

        return (
                <div id="users">

                    {selected_user ? <Profile_Popup account_data={selected_user} Exit={(e)=>{ this.Show_User_Profile(null); }}/> : ""}

                    <div id="users-list">

                        {Object.keys(visible_users).map((key, index) => {

                            let user = visible_users[key];

                            return <div key={index} className="user-wrapper">

                                <User_Thumbnail key={index} user_profile_data={user} show_user_profile={this.Show_User_Profile}/>

                            </div>;

                        })}

                    </div>
                    
                </div>
            );
    }
}

export default Users;