import React, { Component } from 'react';
import Context from '@context/context.js';
import Text_Type from '@data_templates/Info_Types/Text_Type/text_type.js';
import './text_editor.less';

class Text_Editor extends Text_Type {

    constructor(props) {

        super(props);

        Text_Editor.contextType = Context;


    }

    componentDidMount(){

        super.componentDidMount();

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

    render() {


        return <div id="text-type-editor">

            {super.render()}
            
        </div>;
    }
}

export default Text_Editor;