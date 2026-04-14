import React, { Component } from 'react';
import Month_Year_Display from './Month_Year_Display/month_year_display.js';
import Day_Display from './Day_Display/day_display.js';
import Date_Display from './Dates_Display/dates_display.js';
import './calendar.less';

class Calendar extends Component {

    constructor(props) {

        super(props);

        let { year, month, date, callback_left, callback_right, date_properties, capture_date } = this.props;

        let today = new Date();

        year = year ? parseInt(year) : today.getFullYear();
        month = month ? parseInt(month) : today.getMonth() + 1;
        date = date ? parseInt(date) : today.getDate();

        this.state = {
            selected_year: year,
            selected_month: month,
            year: year,
            month: month,
            date: date,
            callback_left: callback_left,
            callback_right: callback_right,
            date_properties: date_properties ? date_properties : [],
            capture_date: capture_date
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {year, month, date, date_properties} = this.props;

        year = parseInt(year);
        month = parseInt(month);
        date = parseInt(date);


        this.setState({
            selected_year: year,
            selected_month: month,
            year,
            month,
            date,
            date_properties: date_properties ?? []
        });
    }

    Update_Month_Year = (month, year) => {

        month = parseInt(month);
        year = parseInt(year);

        this.setState({ month: month + 1, year: year });

    }

    render() {

        let { 
            selected_year, 
            selected_month, 
            year, 
            month, 
            date, 
            callback_left, 
            callback_right, 
            date_properties, 
            capture_date 
        } = this.state;

        return <div id="calendar">

            <div id="year-month">

                <Month_Year_Display year={year}
                    month={month - 1}
                    callback_left={callback_left}
                    callback_right={callback_right}
                    update_parent={this.Update_Month_Year}
                />

            </div>

            <div id="weekdays">

                <Day_Display />

            </div>

            <div id="dates">

                <Date_Display properties={date_properties}
                    days={new Date(year, month, 0).getDate()}
                    first_day={new Date(year, month - 1, 1).getDay()}
                    capture_date={capture_date}
                    month={month - 1}
                    year={year}
                    selected_month={selected_month - 1}
                    selected_year={selected_year}
                    selected_date={date}
                />

            </div>
            
        </div>;
    }
}

export default Calendar;