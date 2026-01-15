import React, {Component} from 'react';
import './date.less';

class DateSearch extends Component {

    constructor(props){

        super(props);

        DateSearch.contextType = window.Context;

        let today = new Date();

        this.state = {
            value: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        };
    }

    ParseDate = (dateStr) => {
        
        const {Configurations} = this.context;
        
        const {Months} = Configurations;
        
        let date = dateStr.split("T")[0];
        
        let parts = date.split("-");
        
        return `${Months[parseInt(parts[1]) - 1]} ${parts[2]}, ${parts[0]}`;
        
    }

    Generate_Calendar = () => {

        const { Calendar } = this.context;

        let { value } = this.state;

        let parts = value.split("-");

        let year = parseInt(parts[0]);
        let month = parseInt(parts[1]);

        return <div id="calendar-wrapper">

            <Calendar date_properties={[]} capture_date={this.Capture_Date} year={year} month={month} />

        </div>
    }

    Capture_Date = ({ selected_year, selected_month, date }) => {

        selected_month = selected_month < 10 ? `0${selected_month}` : selected_month;
        
        date = date < 10 ? `0${date}` : date;

        let dateStr = `${selected_year}-${selected_month}-${date}`;


        this.Save_To_Search(dateStr);

    }

    Save_To_Search = (value)=>{

        let {Save_To_Search, key_index} = this.props;

        this.setState({value});

        Save_To_Search(value, key_index);

    }

    render(){

        return <div id="search-date-input-wrapper">

            <div id="calendar-label-wrapper">

                <label id="search-label">{this.props.label}</label>

            </div>

            <div id="value-wrapper">

                <div id="value">

                    {this.ParseDate(this.state.value)}

                </div>

                {this.Generate_Calendar()}

            </div>

        </div>;
    }
}

export default DateSearch;