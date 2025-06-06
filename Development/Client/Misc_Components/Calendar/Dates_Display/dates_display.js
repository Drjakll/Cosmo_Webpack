import React, { Component } from 'react';
import Date from './Date/date.js';
import './dates_display.less';

class Dates_Display extends Component {

    constructor(props) {

        super(props);

        let { days, first_day, properties } = this.props;

        this.state = {
            days: days,
            first_day: first_day,
            properties: properties
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Generate_Date_Array = ({first_day, days, properties}) => {

        let arr = [];
        let r = 0, c = 0;

        arr.push([]);

        for (let i = 0; i < first_day; i++) {
            arr[c].push({ date: "", callback: null, style: {}, popup: null }); 
            r++;
        }

        for (let i = 0; i < days; i++) {

            if (r > 0 && r % 7 === 0) {
                arr.push([]);
                c++;
            }

            arr[c].push({ date: `${i + 1}`, callback: null, style: {}, popup: null });
            r++;
            
        }

        let remainder = 42 - r;

        for (let i = 0; i < remainder; i++) {

            if (r % 7 === 0) {
                arr.push([]);
                c++;
            }

            arr[c].push({ date: '', callback: null, style: {}, popup: null });
            r++;
        }

        for (let cb of properties) {

            let { date, callback, style, popup } = cb;
            
            let calendar_pos = date + first_day - 1;
            
            let col = Math.floor(calendar_pos/7);
            let row = calendar_pos % 7;

            arr[col][row].callback = callback;
            arr[col][row].style = style;
            arr[col][row].popup = popup;
        }

        return arr;
    }

    render() {

        let date_array = this.Generate_Date_Array(this.state); 

        let { capture_date, selected_month, selected_year } = this.state;

        return <div id="dates-display">

            {date_array.map((row, r_ind) => {

                return <div className="row" key={r_ind}>

                    {row.map((col, c_ind) => {

                        let { date, callback, style, popup } = col;

                        return <div className="col" key={c_ind}>

                            <Date date={date} callback={callback} style={style} popup={popup} capture_date={capture_date} selected_year={selected_year} selected_month={selected_month} />

                        </div>;

                    })}

                </div>;

            })}

        </div>;
    }
}

export default Dates_Display;