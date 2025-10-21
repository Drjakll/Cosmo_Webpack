import React, {Component} from 'react';
import './user_thumbnail.less';

class User_Thumbnail extends Component {

    Dropdown_Options = [
        {name: 'View Profile', action: ()=>{ this.props.show_user_profile(this.state.user_profile_data); }},
        {name: 'Send Message', action: ()=>{ /* Implement send message functionality here */ }}
    ]

    constructor(props){
        
        super(props);

        let {user_profile_data} = this.props;

        User_Thumbnail.contextType = window.Context;

        this.state = {
            user_profile_data
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
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

        let {profile_picture_link, first_name, last_name} = this.state.user_profile_data;

        let {aws_s3_url} = this.context.Request_URLs;

        return (
                <div id="user-thumbnail">

                    {this.Show_Options()}

                    <div id="profile-picture-wrapper">

                        <img src={`${aws_s3_url}${profile_picture_link}`} alt="Profile-Picture" />

                    </div>

                    <div id="profile-name-wrapper">

                        <label>{first_name} {last_name}</label>
                        
                    </div>
                    
                </div>
            );
    }
}

export default User_Thumbnail;