import React, {Component} from 'react';
import './new_item.less';

class New_Item extends Component {


    constructor(props){

        super(props);

        let {owner_user_account, options, table_name} = props;

        this.state = {
            owner_user_account,
            options,
            table_name
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps !== this.props){

            this.setState(this.props);

        }
    }

    render(){

        let { options } = this.state;
        let {input_data_types, add_new_item} = this.props;

        return <div id="json-type-editor">
        
            <div id="input-wrapper">
                
                {options.map((item, index)=>{
                    
                    let {label, data_type, data_name, choices} = item;
                    
                    return <div className="input-item" key={index}>

                        <div id="label">
                            {label}
                        </div>
                        
                        <div id="value">

                            {input_data_types[data_type]({data_name, choices, label, value: ""})}

                        </div>

                    </div>;
                    
                })}
                
            </div>
            
            <div id="buttons-wrapper">
            
                <div id="the-add-button" onClick={(e)=>{ add_new_item(); }}>
                    Add
                </div>
                
            </div>

        </div>; 
    }

}

export default New_Item;