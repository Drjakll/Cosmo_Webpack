import React, { Component } from 'react';
import Choice from '@data_templates/Info_Types/Choice_Type/choice_type.js';
import Context from '@context/context.js';
import './choice_editor.less';

class Choice_Editor extends Choice {

    static contextType = Context;

    constructor(props) {

        super(props);

    }

    Update_Account_Data = async () => {

        let { owner_user_account, column_name, value } = this.state;
        let {id, email, password} = owner_user_account;
        let { update_profile } = this.context.Request_URLs;

        owner_user_account[column_name] = value;

        let body = {
            credentials: {
                email: email,
                id: id,
                password
            },
            to_update: {
                [column_name]: value
            }
        }

        await fetch(update_profile, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.setState({owner_user_account});
    }

    Change_Value = async (value)=>{

        await this.setState({value});

        this.Update_Account_Data();
    }

    Generate_Options = () => {

        let { options } = this.props;

        return <div id="option-selections-wrapper">

            <div id="selections">

                {options.map((option, index) => {

                    return <div className="option" onClick={(e) => { this.Change_Value(option); }} key={index}>

                        {option}

                    </div>;

                })}

            </div>

        </div>;

    }

    render() {

        return <div id="choice-type-editor">

            {super.render()}

        </div>;
    }
}

export default Choice_Editor;