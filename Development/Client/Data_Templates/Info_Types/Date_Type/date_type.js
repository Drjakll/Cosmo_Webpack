import React, {Component} from 'react';
import './date_type.less';

class Date_Type extends Component {    
    
    
    constructor(props){
        
        super(props);

        Date_Type.contextType = window.Context;

        let {value, label, data_name, owner_user_account, update_callback, column_name} = props;

        this.Update_Value = this.Update_Value || update_callback;

        this.state = {
            label,
            value: value ?? "",
            data_name,
            column_name,
            owner_user_account
        };
    }

    Generate_Calendar = null

    Update_Value = null

    ParseDate = (dateStr) => {

        if(!dateStr){
            return "Continue";
        }

        const {Configurations} = this.context;
        
        const {Months} = Configurations;
        
        let date = dateStr.split("T")[0];
        
        let parts = date.split("-");
        
        return `${Months[parseInt(parts[1]) - 1]} ${parts[2]}, ${parts[0]}`;
        
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        let {value, label, data_name, column_name, owner_user_account} = this.props;
        
        this.setState({ value, label, data_name, column_name, owner_user_account });
    }

    render() {

        let {value} = this.state;
        
        return (
            <div id="date-type" className="info">

                <div id="value-wrapper">

                    <div id="value">

                        {value ? this.ParseDate(value) : "Select a Date"}

                    </div>

                    {this.Generate_Calendar && this.Generate_Calendar()}

                </div>

            </div>
        );
    }
}

export default Date_Type;