import React, {Component} from 'react';
import Json_Text_Screen from './Json_Text/json_text.js';
import './json_text_type.less';

class Json_Text_Type extends Component {

    Json_Text_Screen_Component = Json_Text_Screen;

    constructor(props){

        super(props);

        let {value, owner_user_account, column_name, label, update_callback, background} = props;

        this.Update_Value = this.Update_Value || update_callback;

        this.state = {
            value,
            owner_user_account,
            column_name,
            label,
            background
        };
    }

    Update_Value = null;

    Value_Screen = ({owner_user_account})=>{

        let {value, column_name, label, background} = this.state;

        let {Json_Text_Screen_Component} = this;

        return <Json_Text_Screen_Component 
            owner_user_account={owner_user_account}
            value={value}
            column_name={column_name}
            label={label}
            background={background}
        />;
    }

    render(){

        return <div id="json-text-type-wrapper">

            <div id="the-show-button" onClick={(e)=>{this.props.change_main_display(this.Value_Screen)}}>

                Show

            </div>

        </div>;
    }
}

export default Json_Text_Type;