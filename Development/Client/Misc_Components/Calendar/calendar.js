import React, { Component } from 'react';
import Month_Year_Display from './Month_Year_Display/month_year_display.js';
import Day_Display from './Day_Display/day_display.js';
import Date_Display from './Dates_Display/dates_display.js';

class Calendar extends Component {

    constructor(props) {

        super(props);

        let { year, month, date, callback_left, callback_right, date_callbacks } = this.props;

        this.state = {
            year: year,
            month: month,
            date: date,
            callback_left: callback_left,
            callback_right: callback_right,
            date_callbacks: date_callbacks
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Update_Month_Year = (month, year) => {

        this.setState({ month: month, year: year });

    }

    render() {

        let { year, month, callback_left, callback_right, date_callbacks } = this.state;

        return <div>

            <div id="year-month">

                <Month_Year_Display year={year}
                    month={month}
                    callback_left={callback_left}
                    callback_right={callback_right}
                    update_parent={this.Update_Month_Year}
                />

            </div>

            <div id="weekdays">

                <Day_Display />

            </div>

            <div id="dates">

                <Date_Display callbacks={date_callbacks} days={new Date(year, month + 1, 0).getDate()} first_day={new Date(year, month, 1).getDay()} />

            </div>
            

        </div>;
    }
}

export default Calendar;