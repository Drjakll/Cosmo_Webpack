import React from 'react';
import './data_editor.less';
import Popup_Message from '@popup_message';
import Profile_Info_Data from '@profile_info_data';
import Account_Data from '@account_data';
import Text_Type_Editor from './Text_Editor/text_editor.js';
import Date_Type_Editor from './Date_Editor/date_editor.js';
import Json_Type_Editor from './Json_Editor/json_editor.js';
import Choice_Type_Editor from './Choice_Editor/choice_editor.js';
import Json_Text_Editor from './Json_Text_Editor/json_text_editor.js';
import Account_Data_Templates from '@account_data';
import Request_URLs from '@request_urls';
import {Login} from '@account_access';

let {Mood_Options} = Account_Data;

class Profile_Data_Editor extends Profile_Info_Data {

    Account_Changes = {}

    constructor(props){
        
        super(props);

    }

    componentDidMount(){

        this.Setup_Editors();

    }

    componentDidUpdate(prevProps, prevState){

        super.componentDidUpdate(prevProps, prevState);

        if(this.state.owner_user_account?.id === prevState.owner_user_account?.id){
            return;
        }

        this.Setup_Editors();
    }

    Profile_Data_Editors = {        
        email: Text_Type_Editor,
        password: Text_Type_Editor,
        first_name: Text_Type_Editor,
        last_name: Text_Type_Editor,
        date_of_birth: Date_Type_Editor,
        gender: Choice_Type_Editor,
        marital_status: Choice_Type_Editor,
        User_Locations: Json_Type_Editor,
        User_Hobbies: Json_Type_Editor, 
        User_Professions: Json_Type_Editor,
        User_Schools: Json_Type_Editor,
        personal_traits: Json_Text_Editor
    }

    Setup_Editors = () => {

        let {Account_Info_Data_Template} = Account_Data_Templates;

        let info_templates = Account_Info_Data_Template();

        let {owner_user_account} = this.state;

        for(let data_name in this.Profile_Data_Editors){

            if(!info_templates[data_name]){
                continue;
            }

            //Override all the info component in the parent class, these info components allow the info to be editable
            info_templates[data_name].component = this.Profile_Data_Editors[data_name];
        }

        if(!isNaN(parseInt(owner_user_account.id))){

            delete info_templates.email;
            delete info_templates.password;

        }

        this.setState({info_templates});

    }

    Update_Value = ({column_name, value})=>{

        this.Account_Changes[column_name] = value;

        let {owner_user_account} = this.state;

        owner_user_account[column_name] = value;

        this.setState({owner_user_account});
    }

    Save_Changes = async (e) => {

        let { owner_user_account } = this.state;
        let {id, email, password} = owner_user_account;
        let { update_profile } = Request_URLs;

        let body = {
            credentials: {
                email,
                id,
                password
            },
            to_update: this.Account_Changes
        }

        let response = await fetch(update_profile, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let data = await response.json();

        Popup_Message("message", data?.message);
    }

    Create_Mood_Selections = ()=>{

        let update_mood = async (mood_name)=>{

            let {owner_user_account} = this.state;

            let {id, password} = owner_user_account;

            owner_user_account.mood_today = mood_name;

            let today = new Date().toISOString().split("T")[0];

            owner_user_account.last_mood_updated = today;

            let {update_profile} = Request_URLs;

            let body = {
                to_update: {
                    last_mood_updated: today,
                    mood_today: mood_name
                },
                credentials: {
                    id,
                    password
                }
            };

            await fetch(update_profile, {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.setState({owner_user_account});
        }

        let {mood_today, last_mood_updated} = this.state.owner_user_account;
        
        let mood_updated = last_mood_updated?.split("T")[0];

        let utc_today = new Date().toISOString().split("T")[0];

        let mood_available = ""; 

        //If the mood isn't up to date, then it isn't available
        if(mood_updated === utc_today){

            mood_available = mood_today;

        }

        return <div id="list-of-moods">

            {Object.keys(Mood_Options).sort().map((mood_name, index)=>{

                let mood_icon_name = Mood_Options[mood_name];

                return <div className="mood-selection" key={mood_name} onClick={(e)=>{update_mood(mood_name)}}>

                        <div id="the-icon-wrapper" className={mood_available === mood_name ? "selected-mood" : ""}>

                            <img src={`./static/${mood_icon_name}`}/>

                        </div>

                        <div id="hover-mood-name-display">

                            {mood_name}

                        </div>

                    </div>;
            })}

        </div>
    }

    Send_Verification_Code = async (e) => {

        let {owner_user_account} = this.state;

        let {id, email} = owner_user_account;

        let {send_verification_code} = Request_URLs;

        let body = {
            id,
            email
        }

        let response = await (await fetch(send_verification_code, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();

        let {message, failed} = response;

        let result = {input: ""};

        await Popup_Message("input", message + "\nPlease enter the verification code:", result);

        this.Verify_Account(email, result.input);

    }

    Verify_Account = async (email, code) => {

        let {verify_account} = Request_URLs;

        let req_path = `${verify_account}/${email}/${code}`;

        let response = await (await fetch(req_path, {
            method: "GET"
        })).json();

        let {message, failed} = response;

        await Popup_Message("message", message);

        if(!failed){

            this.setState({owner_user_account: await Login()});

        }
    }

    Generate_Verification_Button = () => {

        let open_warning_popup = async () => {

            let {created_on} = this.state.owner_user_account;

            let now = Date.now();

            let three_days = 3 * 24 * 3600000;

            let msg = "";

            let interval = three_days - (now - created_on);

            let days = Math.floor(interval / (24 * 3600000));

            let hours = Math.floor((interval % (24 * 3600000)) / 3600000);

            let minutes = Math.floor((interval % 3600000) / 60000);

            if (interval <= 0) {
                msg = `Your account is at risk of \nbeing erased, please verify your email \nto avoid being erased.`;
            } else {
                msg = `Please verify your email within \n ${days} days, ${hours} hours, ${minutes} minutes, \nto avoid this account being erased.`;
            }

            await Popup_Message("message", msg);
        }

        return <div id="verification-area-wrapper">

            <button onClick={this.Send_Verification_Code}>Verify Email</button>

            <div id="verification-message" onClick={open_warning_popup}>
        
                <img src="./static/warning_icon.webp"/>

                <label>Warning</label>

            </div>

        </div>
    }

    render(){

        let {owner_user_account} = this.state;

        let email_verified = owner_user_account?.email_verified;

        return (
            <div id="profile-data-editor">

                <div id="profile-data-contents-wrapper">

                    {super.render()}   

                </div>

                <div id="save-button-wrapper">

                    <button onClick={this.Save_Changes}>Save</button>
                    
                    {!email_verified ? this.Generate_Verification_Button() : ""}
                    
                </div>   

            </div>
        )
    }

}

export default Profile_Data_Editor;