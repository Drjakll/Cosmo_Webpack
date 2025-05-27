import React, { Component } from 'react';
import Date from './Date/date.js';

class Dates_Display extends Component {

    constructor(props) {

        super(props);

        let { days, first_day, callbacks } = this.props;

        this.state = {
            days: days,
            first_day: first_day,
            callbacks: callbacks
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Generate_Date_Array = ({first_day, days, callbacks}) => {

        let arr = [];
        let r = 0, c = 0;

        arr.push([])

        for (let i = 0; i < first_day; i++) {
            arr[c].push({ date: "", callback: null }); 
            r++;
        }

        for (let i = 0; i < days; i++) {

            if (r % 7 === 0) {
                arr.push([]);
                c++;
            }

            arr[c].push({ date: `${i + 1}`, callback: null });
            r++;
            
        }

        let remainder = 42 - c;

        for (let i = 0; i < remainder; i++) {

            if (r % 7 === 0) {
                arr.push([]);
                c++;
            }

            arr[c].push({ date: '', callback: null });
            r++;
        }

        for (let cb of callbacks) {

            let { index, callback } = cb;

            let col = Math.floor(index/7);
            let row = index % 7;

            arr[col][row].callback = callback;
        }

        return arr;
    }

    render() {

        let date_array = this.Generate_Date_Array(this.state); 

        return <div id="dates-display">

            {date_array.map((row, r_ind) => {

                return <div className="row" key={r_ind}>

                    {row.map((col, c_ind) => {

                        let { date, callback } = col;

                        return <div className="col" key={c_ind}>

                            <Date date={date} callback={callback} />

                        </div>;

                    })}

                </div>;

            })}

        </div>;
    }
}

export default Dates_Display;