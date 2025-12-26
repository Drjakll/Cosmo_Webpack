import React from 'react';
import './profile_data_editor.less';
import Context from '@context/context.js';
import {Profile_Info_Data} from '@profile_template';
import Text_Type_Editor from './Text_Editor/text_editor.js';
import Date_Type_Editor from './Date_Editor/date_editor.js';
import Json_Type_Editor from './Json_Editor/json_editor.js';
import Choice_Type_Editor from './Choice_Editor/choice_editor.js';

class Profile_Data_Editor extends Profile_Info_Data {

    static contextType = Context

    constructor(props){
        
        super(props);

    }

    componentDidMount(){

        let {Account_Info_Data_Template} = this.context.Account_Data_Templates;

        let info_templates = Account_Info_Data_Template();

        for(let data_name in this.Profile_Data_Editors){

            if(!info_templates[data_name]){
                continue;
            }

            //Override all the info component in the parent class, these info components allow the info to be editable
            info_templates[data_name].component = this.Profile_Data_Editors[data_name];
        }

        this.setState({info_templates});
    }

    Profile_Data_Editors = {
        first_name: Text_Type_Editor,
        last_name: Text_Type_Editor,
        date_of_birth: Date_Type_Editor,
        gender: Choice_Type_Editor,
        marital_status: Choice_Type_Editor,
        User_Locations: Json_Type_Editor,
        User_Hobbies: Json_Type_Editor, 
        User_Professions: Json_Type_Editor,
        User_Schools: Json_Type_Editor
    }

    render(){

        return (
            <div id="profile-data-editor">

                {super.render()}      

            </div>
        )
    }

}

export default Profile_Data_Editor;