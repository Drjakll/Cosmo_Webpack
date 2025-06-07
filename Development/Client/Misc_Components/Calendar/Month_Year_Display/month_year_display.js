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
            years: [],
            month: month,
            year: year,
            callback_left: callback_left,
            callback_right: callback_right,
            update_parent: update_parent
        };
    }
    
    componentDidMount(){
                
        let years = [];
        
        let thisYear = (new Date()).getFullYear();
        
        for(let i = 0; i < 121; i++){
            years.push(thisYear - i);
        }
        
        this.setState({years: years});
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
    
    Year_Selections = () => {
        
        let Select = async (year) => {
            
            year = parseInt(year);
            
            if(this.state.callback_left){
                this.state.callback_left({year: year, month: this.state.month + 1});
            }
            
            this.props.update_parent(this.state.month, year);
            
        };
        
        return <div id="year-selections">
        
            {this.state.years.map((value, index)=>{
                
                return <div className="year-item" onClick={(e)=>{ Select(value); }} key={index}>
                    
                    {value}
                    
                </div>;
                
            })}
        
        </div>;
    }
    
    Month_Selections = () => {
        
        let Select = async (ind) => {
 
            let month_index = parseInt(ind);
            
            if(this.state.callback_left){
                this.state.callback_left({year: this.state.year, month: month_index + 1});
            }
            
            this.props.update_parent(month_index, this.state.year);
            
        };
        
        return <div id="month-selections">
        
            {this.Months.map((value, index)=>{
                
                return <div className="month-item" onClick={(e)=>{ Select(index); }} key={index}>
                    
                    {value}
                    
                </div>;
                
            })}
        
        </div>;
    }

    render() {

        return <div id="month-year-wrapper">

            <div className="navigation left"
                onClick={(e) => {

                    let { year, month } = this.Add_Month(-1, this.state);

                    if (this.state.callback_left) {
                        this.state.callback_left({year: year, month: month + 1});
                    }

                    this.setState({ month: month, year: year });

                }}
            >

                {`<`}

            </div>

            <div id="month-year-display">

                <div id="year">

                    <div id="selected-year">{this.state.year}</div>
                    
                    <div id="year-selections-wrapper">

                        {this.Year_Selections()}

                    </div>

                </div>

                <div id="month">

                    <div id="selected-month">{this.Months[this.state.month]}</div>
                    
                    <div id="month-selections-wrapper">
                        
                        {this.Month_Selections()}
                        
                    </div>

                </div>

            </div>

            <div className="navigation right"
                onClick={(e) => {

                    let { year, month } = this.Add_Month(1, this.state);

                    if (this.state.callback_right) {
                        this.state.callback_right({ year: year, month: month + 1 });
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