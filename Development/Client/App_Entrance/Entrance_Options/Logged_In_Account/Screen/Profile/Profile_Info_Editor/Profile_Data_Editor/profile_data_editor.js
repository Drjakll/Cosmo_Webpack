import React from 'react';
import './profile_data_editor.less';
import {Profile_Info_Data} from '@profile_template';
import Text_Type_Editor from './Text_Type/text_type.js';
import Date_Type_Editor from './Date_Type/date_type.js';
import Json_Type_Editor from './Json_Type/json_type.js';
import Choice_Type_Editor from './Choice_Type/choice_type.js';

class Profile_Data_Editor extends Profile_Info_Data {

    constructor(props){
        super(props);

        this.state.editors = this.Profile_Data_Editors;
    }

    Profile_Data_Editors = {
            first_name: Text_Type_Editor,
            last_name: Text_Type_Editor,
            date_of_birth: Date_Type_Editor,
            location_of_birth: Json_Type_Editor,
            gender: Choice_Type_Editor,
            current_location: Json_Type_Editor,
            marital_status: Choice_Type_Editor,
            hobbies: Json_Type_Editor, 
            professions: Json_Type_Editor,
            schools: Json_Type_Editor
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