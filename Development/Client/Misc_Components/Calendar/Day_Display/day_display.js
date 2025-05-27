import React, { Component } from 'react';
import './day_display.less';

class Day_Display extends Component {

    Week_Days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]

    constructor(props) {

        super(props);

        this.state = {
            weekdays: [0,1,2,3,4,5,6]
        };
    }



    render() {

        let { weekdays } = this.state;

        return <div id="weekdays-display">

            {weekdays.map((val, ind) => {

                return <div className="weekday" key={ind}>

                    {this.Week_Days[val]}

                </div>;

            })}

        </div>;
    }
}

export default Day_Display;