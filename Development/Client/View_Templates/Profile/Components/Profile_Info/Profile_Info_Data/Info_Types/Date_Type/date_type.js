import React, {Component} from 'react';
import './date_type.less';

class Date_Type extends Component {

    state = {
        label: "",
        value: ""
    };    
    
    
    constructor(props){
        
        super(props);

        Date_Type.contextType = window.Context;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        for(let i in this.props){
            
            this.state[i] = this.props[i];
        }
        
        this.setState(this.state);
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

        let dateStr = `${selected_year}-${selected_month}-${date}`;
;

        this.setState({ value: dateStr });

    }
    
    render() {

        let Editor = this.props.editor;
        let variable_name = this.props.variable_name;
        let account_data = this.props.account_data;
        const refresh_account_data = this.props.refresh_account_data;
        
        return (
            <div id="date-type" className="info">

                <div id="value-wrapper">

                    <div id="value">

                        {this.ParseDate(this.state.value)}

                    </div>

                    {Editor ? this.Generate_Calendar() : <></> }

                </div>

                <div id="editor">

                    {Editor ? <Editor variable_name={variable_name}
                        value={this.state.value}
                        account_data={account_data}
                        current_value={this.state.value}
                        refresh_account_data={refresh_account_data}
                    /> : <></>}

                </div>

            </div>
        );
    }
}

export default Date_Type;