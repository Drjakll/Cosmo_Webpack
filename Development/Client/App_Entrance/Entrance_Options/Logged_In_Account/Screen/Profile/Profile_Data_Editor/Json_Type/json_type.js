import React, { Component } from 'react';
import './json_type.less';

class Json_Type extends Component {

    constructor(props) {

        super(props);
        
        Json_Type.contextType = window.Context;
        
        let {account_data, refresh_account_data, variable_name, update_account_data, data_config, value } = this.props;

        this.state = {
            current_value: value,
            json_obj: {},
            account_data: account_data,
            variable_name: variable_name,
            update_account_data: update_account_data,
            refresh_account_data: refresh_account_data,
            data_config: data_config
        };

    }
    
    Input_Data_Types = {
        "string" : (key_label)=>{
            
            let onChange = (e) => {
                
                let { json_obj } = this.state;
                
                json_obj[key_label] = e.target.value;
                
                this.setState({json_obj: json_obj});
                
            };
            
            return <div className="input-data-type string">
            
                <input type="text" onBlur={onChange} />
            
            </div>;
        },
        "date" : (key_label)=>{
            
            const {Calendar} = this.context;
            
            let onChange = ({selected_year, selected_month, date}) => {
                
                let { json_obj } = this.state;
                
                json_obj[key_label] = `${selected_year}-${selected_month}-${date}`;
                
                this.setState({json_obj: json_obj});
                
            };
           
            
            return <div className="input-data-type date">
            
                <div id="selected-date">
                    
                    {this.state.json_obj[key_label]}
                    
                </div>
                
                <div id="dropdown">
                
                    <Calendar capture_date={onChange} />
                    
                </div>
                
            </div>;
        }
    }   
    
    Add_New_Item = async ()=>{
        
        let {current_value, json_obj, update_account_data} = this.state;
        
        current_value.push(json_obj);
        
        update_account_data(JSON.stringify(current_value));
       
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    

    render() {
        
        let {data_config } = this.state;

        return <div id="json-type-editor">
        
            <div id="input-wrapper">
                
                {data_config.map((item, index)=>{
                    
                    let {label, data_type} = item;
                    
                    return <div className="input-item" key={index}>

                        <div id="label">
                            {label}
                        </div>
                        
                        <div id="value">

                            {this.Input_Data_Types[data_type](label)}

                        </div>

                    </div>;
                    
                })}
                
            </div>
            
            <div id="buttons-wrapper">
            
                <div id="the-add-button" onClick={(e)=>{ this.Add_New_Item(); }}>
                    Add
                </div>
                
            </div>

        </div>;
    }
}

export default Json_Type;