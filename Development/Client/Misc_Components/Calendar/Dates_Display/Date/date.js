import React, { Component } from 'react';
import './date.less';

class Date extends Component {

    constructor(props) {

        super(props);



        this.state = {
            date: this.props.date,
            month: this.props.month,
            year: this.props.year,
            style: this.props.style,
            popup: this.props.popup,
            capture_date: this.props.capture_date,
            selected_year: this.props.selected_year,
            selected_month: this.props.selected_month,
            selected_date: this.props.selected_date,
            callback: this.props.callback
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);

    }

    render() {

        let { capture_date, date, month, year, selected_year, selected_month, selected_date } = this.state;

        let is_selected = parseInt(date) === parseInt(selected_date) && parseInt(month) === parseInt(selected_month) && parseInt(year) === parseInt(selected_year);

        return (
            <div id="date" onClick={(e) => {

                    if (this.props.callback) {
                        this.props.callback(date);
                    }
                    
                    if (capture_date) {
                        capture_date({ selected_year: year, selected_month: parseInt(month) + 1, date });
                    }
                }}

                style={this.state.style}
            >
                <div id="popup">
                    {this.state.popup}
                </div>

                <div id="the-date-value" className={`${is_selected ? "selected-date" : ""}`}>

                    {this.state.date}

                </div>

            </div>
        );
    }
}

export default Date;