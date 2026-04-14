import React, { Component } from 'react';
import Context from '@context/context.js';
import Date_Data from '@data_templates/Info_Types/Date_Type/date_type.js';
import './date_editor.less';

class Date_Editor extends Date_Data {

    constructor(props) {

        super(props);

        Date_Editor.contextType = Context;
    }

    Generate_Calendar = () => {

        const { Calendar } = this.context;

        let { value } = this.state;

        let year, month, date;

        if(!value){

            year = new Date().getFullYear();
            month = new Date().getMonth() + 1;
            date = new Date().getDate();

        } else {

            [year, month, date] = value.split("T")[0].split("-");
            year = parseInt(year);
            month = parseInt(month);
            date = parseInt(date);
        
        }

        return <div id="calendar-wrapper">

            <Calendar 
                date_properties={[]} 
                capture_date={this.Capture_Date} 
                year={year} 
                month={month} 
                date={date}
            />

        </div>
    }

    Capture_Date = async ({ selected_year, selected_month, date }) => {

        let dateStr = `${selected_year}-${selected_month}-${date}`;

        await this.setState({ value: dateStr });

        let {column_name} = this.state;

        this.Update_Value && this.Update_Value({column_name, value: dateStr});

    }

    render() {

        return <div id="date-type-editor">

            {super.render()}

        </div>;
    }
}

export default Date_Editor;