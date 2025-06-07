import React, { Component } from 'react';
import './date.less';

class Date extends Component {

    constructor(props) {

        super(props);

        this.state = {
            date: this.props.date,
            style: this.props.style,
            popup: this.props.popup,
            capture_date: this.props.capture_date,
            selected_year: this.props.selected_year,
            selected_month: this.props.selected_month,
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

        let { capture_date, selected_year, selected_month, date } = this.state;

        return (
            <div id="date" onClick={(e) => {

                if (this.props.callback) {
                    this.props.callback(date);
                }
                
                if (capture_date) {
                    capture_date({ selected_year, selected_month: parseInt(selected_month) + 1, date });
                }
            }}

                style={this.state.style}

            >
                <div id="popup">
                    {this.state.popup}
                </div>

                <div id="the-date-value">

                    {this.state.date}

                </div>

            </div>
        );
    }
}

export default Date;