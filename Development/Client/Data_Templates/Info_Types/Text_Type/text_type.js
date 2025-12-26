import React, {Component} from 'react';
import './text_type.less';

class Text_Type extends Component {

    constructor(props){
        
        super(props);

        let {value, owner_user_account, column_name, label} = props;

        this.state = {
            value,
            owner_user_account,
            column_name, 
            label
        };

    }
    
    componentDidMount(){


    }

    Update_Account_Data = ()=>{};

    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    render() {

        return (
            <div id="text-type" className="info">

                <div id="value-wrapper">

                    <input id="value"
                        onChange={(e) => { this.setState({ value: e.target.value }); }} 
                        value={this.state.value} 
                        onBlur={(e)=>{ this.Update_Account_Data && this.Update_Account_Data(); }}
                        disabled={ this.Update_Account_Data === null ? true : false} />

                </div>

            </div>
        );
    }
}

export default Text_Type;