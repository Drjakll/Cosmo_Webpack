import React, {Component} from 'react';
import './date_type.less';

class Date_Type extends Component {    
    
    
    constructor(props){
        
        super(props);

        Date_Type.contextType = window.Context;

        let {value, label, data_name, owner_user_account} = props;

        this.state = {
            label,
            value,
            data_name,
            owner_user_account
        };
    }

    Update_Account_Data = null

    Generate_Calendar = null
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }

    
    render() {
        
        return (
            <div id="date-type" className="info">

                <div id="value-wrapper">

                    <div id="value">

                        {this.ParseDate(this.state.value)}

                    </div>

                    {this.Generate_Calendar && this.Generate_Calendar()}

                </div>

            </div>
        );
    }
}

export default Date_Type;