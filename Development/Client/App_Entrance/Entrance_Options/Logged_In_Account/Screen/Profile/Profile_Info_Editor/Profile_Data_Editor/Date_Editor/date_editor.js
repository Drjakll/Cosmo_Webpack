import React, { Component } from 'react';
import Context from '@context/context.js';
import Date_Data from '@data_templates/Info_Types/Date_Type/date_type.js';
import './date_editor.less';

class Date_Editor extends Date_Data {

    constructor(props) {

        super(props);

        Date_Editor.contextType = Context;
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

    
    ParseDate = (dateStr) => {
        
        const {Configurations} = this.context;
        
        const {Months} = Configurations;
        
        let date = dateStr.split("T")[0];
        
        let parts = date.split("-");
        
        return `${Months[parseInt(parts[1]) - 1]} ${parts[2]}, ${parts[0]}`;
        
    }

    Generate_Calendar = () => {

        const { Calendar } = this.context;

        let { value } = this.state;

        let parts = value.split("-");

        let year = parseInt(parts[0]);
        let month = parseInt(parts[1]);

        return <div id="calendar-wrapper">

            <Calendar date_properties={[]} capture_date={this.Capture_Date} year={year} month={month} />

        </div>
    }

    Capture_Date = async ({ selected_year, selected_month, date }) => {

        let dateStr = `${selected_year}-${selected_month}-${date}`;

        await this.setState({ value: dateStr });

        this.Update_Account_Data();

    }

    render() {

        return <div id="date-type-editor">

            {super.render()}

        </div>;
    }
}

export default Date_Editor;