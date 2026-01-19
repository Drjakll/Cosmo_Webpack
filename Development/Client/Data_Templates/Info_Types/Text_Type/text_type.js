import React, {Component} from 'react';
import './text_type.less';

class Text_Type extends Component {

    constructor(props){
        
        super(props);

        let {value, owner_user_account, column_name, label, update_callback} = props;

        this.Update_Value = this.Update_Value || update_callback;

        this.state = {
            value,
            owner_user_account,
            column_name, 
            label
        };

    }
    
    componentDidMount(){


    }

    Update_Value = null;

    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        //this.setState(this.props);
    }
    
    render() {

        let {value, column_name, label} = this.state;

        return (
            <div id="text-type" className="info">

                <div id="value-wrapper">

                    <input id="value"
                        defaultValue={value} 
                        placeholder={label}
                        onBlur={(e)=>{this.setState({ value: e.target.value }); this.Update_Value && this.Update_Value({column_name, value: e.target.value}); }}
                        disabled={ !this.Update_Value ? true : false} />

                </div>

            </div>
        );
    }
}

export default Text_Type;