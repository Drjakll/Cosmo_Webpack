import React, {Component} from 'react';
import Request_URLs from '@request_urls';
import popup_message from '@popup_message';
import './user_thumbnail.less';

class User_Thumbnail extends Component {

    Dropdown_Options = [
        {name: 'View Profile', action: ()=>{ this.props.show_user_profile(this.state.user_profile_data); }},
        {name: 'New Conversation', action: ()=>{ this.Create_New_Conversation(); }}
    ]

    constructor(props){
        
        super(props);

        let {user_profile_data, owner_user_account, selected} = this.props;

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

        let {create_conversation} = Request_URLs;
        
        let users = {
            from_id: this.state.owner_user_account.id,
            oppose_id: this.state.user_profile_data.id
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

        if(!data){
            await popup_message("message", "Error while inviting to private messages");
            return;
        }

        if(data.blocked){
            await popup_message("message", data.message);
        }

        this.props.refresh_conversation_list([{user_id: users.from_id}, {user_id: users.oppose_id}]);
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

        let {profile_picture_link, first_name, last_name, id} = user_profile_data;

        let {aws_s3_url} = Request_URLs;

        let url = profile_picture_link ? `${aws_s3_url}${profile_picture_link}` : './static/pp_placeholder.webp';

        return (
                <div id="user-thumbnail">

                    {this.Show_Options()}

                    <div id="profile-picture-wrapper" 
                        onClick={(e)=>{
                            this.props.select_user(id);
                        }}
                    >

                        <img src={url} 
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