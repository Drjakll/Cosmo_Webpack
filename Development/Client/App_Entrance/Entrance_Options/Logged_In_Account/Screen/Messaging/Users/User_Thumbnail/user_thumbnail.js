import React, {Component} from 'react';
import './user_thumbnail.less';

class User_Thumbnail extends Component {

    Dropdown_Options = [
        {name: 'View Profile', action: ()=>{ this.props.show_user_profile(this.state.user_profile_data); }},
        {name: 'New Conversation', action: ()=>{ this.Create_New_Conversation(); }}
    ]

    constructor(props){
        
        super(props);

        let {user_profile_data, owner_user_account, selected} = this.props;

        User_Thumbnail.contextType = window.Context;

        this.state = {
            user_profile_data,
            owner_user_account,
            selected
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }


        this.setState(this.props);
    }

    Create_New_Conversation = async ()=>{

        let {create_conversation} = this.context.Request_URLs;
        
        let users = {
            initiator_email: this.state.owner_user_account.email,
            oppose_email: this.state.user_profile_data.email
        };

        let data = await( await fetch(
            create_conversation,
            {
                method: "POST",
                body: JSON.stringify(users),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        this.props.refresh_conversation_list([{email: users.oppose_email}]);
    }

    Show_Options = ()=>{

        return <div id="user-thumbnail-options-button">

            <div id="hover-to-display-options">
        
                <label>...</label>

            </div>

            <div id="option-drop-down-wrapper">

                {this.Dropdown_Options.map((option, index) => {

                    return <div key={index} className="option-item" onClick={(e)=>{ option.action(); }}>

                        <label>{option.name}</label>

                    </div>;

                })}

            </div>

        </div>

    }

    render(){

        let {selected, user_profile_data} = this.state;

        let {profile_picture_link, first_name, last_name, email} = user_profile_data;

        let {aws_s3_url} = this.context.Request_URLs;

        return (
                <div id="user-thumbnail">

                    {this.Show_Options()}

                    <div id="profile-picture-wrapper" 
                        onClick={(e)=>{
                            this.props.select_user(email);
                        }}
                    >

                        <img src={`${aws_s3_url}${profile_picture_link}`} 
                            alt="Profile-Picture" 
                            className={`${selected ? "selected-user" : ""}`}
                            draggable={false}
                        />

                    </div>

                    <div id="profile-name-wrapper">

                        <label>{first_name} {last_name}</label>
                        
                    </div>
                    
                </div>
            );
    }
}

export default User_Thumbnail;