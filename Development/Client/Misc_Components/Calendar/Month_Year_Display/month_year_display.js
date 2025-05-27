import React, { Component } from 'react';
import './month_year_display.less';

class Month_Year_Display extends Component {

    Months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    constructor(props) {

        super(props);

        let { month, year, callback_left, callback_right, update_parent } = this.props;

        this.state = {
            month: month,
            year: year,
            callback_left: callback_left,
            callback_right: callback_right,
            update_parent: update_parent
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);

    }

    Add_Month = (dir, { month, year}) => {

        month += dir;

        month %= 12;

        month += (month < 0 ? 12 : 0);

        if (dir > 0 && month === 0) {
            year++;
        }

        if (dir < 0 && month === 11) {
            year--;
        }

        this.props.update_parent(month, year);

        return { month, year };

    }

    render() {

        return <div id="month-year-wrapper">

            <div className="navigation left"
                onClick={(e) => {

                    let { year, month } = this.Add_Month(-1, this.state);

                    if (this.state.callback_left) {
                        this.state.callback_left({year: year, month: month});
                    }

                    this.setState({ month: month, year: year });

                }}
            >

                {`<`}

            </div>

            <div id="month-year-display">

                <div id="year">

                    {this.state.year}

                </div>

                <div id="month">

                    {this.Months[this.state.month]}

                </div>

            </div>

            <div className="navigation right"
                onClick={(e) => {

                    let { year, month } = this.Add_Month(1, this.state);

                    if (this.state.callback_right) {
                        this.state.callback_right({ year: year, month: month });
                    }

                    this.setState({ month: month, year: year });

                }}
            >

                {`>`}

            </div>

        </div>;
    }
}

export default Month_Year_Display;