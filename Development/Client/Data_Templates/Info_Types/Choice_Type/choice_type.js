import React, {Component} from 'react';
import './choice_type.less';

class Choice_Type extends Component {

    
    constructor(props){
        
        super(props);

        let { value, label, column_name, owner_user_account, update_callback} = props;

        this.Update_Value = this.Update_Value || update_callback;
        
        this.state = {
            value,
            label,
            column_name,
            owner_user_account
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }

    Generate_Options = null

    Update_Value = null
    
    render() {

        let {value, label} = this.state;
        
        return (
            <div id="choice-type" className="info">

                <div id="value-wrapper">

                    <div id="value">

                        {value !== "" ? value : `Select ${label}`}

                    </div>

                    {this.Generate_Options && this.Generate_Options()}

                </div>

            </div>
        );
    }
}

export default Choice_Type;