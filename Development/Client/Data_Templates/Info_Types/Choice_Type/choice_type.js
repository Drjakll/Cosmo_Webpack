import React, {Component} from 'react';
import './choice_type.less';

class Choice_Type extends Component {

    
    constructor(props){
        
        super(props);

        let { value, label, column_name, owner_user_account} = props;
        
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
    
    render() {
        
        return (
            <div id="choice-type" className="info">

                <div id="value-wrapper">

                    <div id="value">

                        {this.state.value ? this.state.value : ""}

                    </div>

                    {this.Generate_Options && this.Generate_Options()}

                </div>

            </div>
        );
    }
}

export default Choice_Type;